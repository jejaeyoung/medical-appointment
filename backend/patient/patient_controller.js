const Patient = require('./patient_model');
const Doctor = require('../doctor/doctor_model');
const Appointment = require('../appointments/appointment_model');
const MedicalSecretary = require('../medicalsecretary/medicalsecretary_model');
const Prescription = require('../prescription/prescription_model')
const Notification = require('../notifications/notifications_model')
const speakeasy = require('speakeasy');
const moment = require('moment-timezone');
const QRCode = require('qrcode');
// Setup Two-Factor Function
const setupTwoFactor = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    let secret;
    if (!patient.twoFactorSecret || req.body.regenerate) {
      // Generate a new secret key if the patient does not have one or if regenerate flag is true
      secret = speakeasy.generateSecret({ length: 30 });
      patient.twoFactorSecret = secret.base32;
      patient.twoFactorEnabled = true; // Enable 2FA for this patient
      await patient.save(); // Save the changes
    } else {
      // Use the existing secret key
      secret = { base32: patient.twoFactorSecret };
    }

    // Log the stored secret key for debugging
    console.log('Stored Secret in DB:', patient.twoFactorSecret);

    // Generate the QR code with the saved secret key using the method from the schema
    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `Landagan Kids Clinic:${patient.patient_email}`,
      issuer: 'Landagan Kids Clinic',
      encoding: 'base32'
    });

    console.log('OTP Auth URL:', otpAuthUrl);

    const qrCode = await QRCode.toDataURL(otpAuthUrl);

    console.log('Generated Secret:', secret.base32); // Log the secret

    res.json({ qrCode, secret: secret.base32 });
  } catch (error) {
    console.error('Error generating 2FA secret:', error); // Log the error
    res.status(500).json({ message: 'Error generating 2FA secret', error });
  }
};


// Verify Two-Factor Function
const verifyTwoFactor = async (req, res) => {
  const { userId, token } = req.body;

  try {
    const user = await Patient.findById(userId) || await Doctor.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA not enabled for this user' });
    }

    if (!token) {
      return res.status(400).json({ message: '2FA token is required' });
    }

    console.log(`Verifying token: ${token} for user ${userId}`);
    console.log(`Secret key: ${user.twoFactorSecret}`);

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 2 
    });
    console.log(`Verified: ${verified}`);
    if (verified) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false, message: 'Invalid 2FA token' });
    }
  } catch (error) {
    console.error('Error verifying 2FA token:', error);
    res.status(500).json({ message: 'Error verifying 2FA token', error });
  }
};







const NewPatientSignUp = (req, res) => {
    Patient.create(req.body)
    .then((newPatient) => {
        res.json({newPatient: newPatient, status:"Successfully registered Patient."})
        console.log(newPatient)
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong. Please try again.', error:err})
        console.log(err)
    });
} 

const findAllPatient = (req, res) => {
    Patient.find()
    .populate('patient_appointments')
    .then((allDataPatient) => {
      res.json({ thePatient: allDataPatient })
  })
  .catch((err) => {
      res.json({ message: 'Something went wrong', error: err })
  });
}


//getPatient
const findPatientById = (req, res) => {
  Patient.findOne({ _id: req.params.uid })
    .populate({
      path: 'patient_appointments',
      populate: [
        {
          path: 'doctor',
          model: 'Doctor'
        },
        {
          path: 'prescription',
          model: 'Prescription',
          populate: {
            path: 'doctor',
            model: 'Doctor'
          }
        }
      ]
    })
    .populate({
      path: 'notifications',
      model: 'Notification'
    })
    .populate({
      path: 'prescriptions',
      model: 'Prescription'
    })
    .then((thePatient) => {
      if (!thePatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json({ thePatient });
    })
    .catch((err) => {
      console.error('Error finding patient by ID:', err);
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
};



const findPatientByEmail = (req, res) => {
  Patient.findOne({email:req.params.email})
      .then((thePatient) => {
          res.json({theEmail : thePatient})
      })
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      });
}

// Array New Post
const addNewPostById = (req, res) => {
    Patient.findById({_id:req.params.id})
      .then((Patient) => {
        if (!Patient) {
          res.json({ message: 'Patient not found' });
        }
        Patient.post.unshift(req.body.post);
        return Patient.save();
      })
      .then((updatedPatient) => {
        res.json({ updatedPatient, message: 'New post added successfully' });
      })
      .catch((error) => {
        res.json({ message: 'Error adding post', error });
      });
  };
  

//find posts by id Array 
const getAllPostbyId = (req, res) => {
    Patient.findOne({ _id: req.params.id })
      .then((Patient) => {
        if (!Patient) {
          res.json({ message: 'Patient not found' });
        }
          res.json({ posts: Patient.post }); 
      })
      .catch((err) => {
        res.json({ message: 'Error retrieving posts', error: err });
      });
};

//Deleting by Id Array Post
const findPostByIdDelete = (req, res) => {
  Patient.findById(req.params.uid)
    .then((Patient) => {
      if (!Patient) {
        return res.json({ message: 'Patient not found' });
      }
        Patient.post.splice(req.params.index, 1); 
        return Patient.save()
          .then((updatedPatient) => {
            res.json({ updatedPatient, message: 'Post deleted successfully' });
          })
          .catch((error) => {
            res.json({ message: 'Error deleting post', error });
          });

    })
    .catch((error) => {
      res.json({ message: 'Error finding Patient', error });
    });
};


const updatePostAtIndex = (req, res) => {
  Patient.findById(req.params.id)
    .then((Patient) => {
      if (!Patient) {
        return res.json({ message: 'Patient not found' });
      }
            Patient.post[req.params.index] = req.body.post; 
            return Patient.save()
          .then((updatedPatient) => {
            res.json({ updatedPatient, message: 'Post updated successfully' });
          })
          .catch((error) => {
            res.json({ message: 'Error updating post', error });
          });
    })
    .catch((error) => {
      res.json({ message: 'Error finding Patient', error });
    });
};

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason, cancelReason, secretaryId, prescriptionId, medium, payment } = req.body;
    const patientId = req.params.uid; // Patient ID from URL parameter

    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      prescription: prescriptionId,
      date,
      time,
      reason,
      cancelReason,
      medium,
      payment,
     
      secretary: secretaryId
    });

    await newAppointment.save();

    // Update Doctor's appointments
    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { dr_appointments: newAppointment._id }
    });

    // Update Patient's appointments
    await Patient.findByIdAndUpdate(patientId, {
      $push: { patient_appointments: newAppointment._id } // Ensure this field matches the model
    });

    // Update Medical Secretary's appointments 
    if (secretaryId) {
      await MedicalSecretary.findByIdAndUpdate(secretaryId, {
        $push: { ms_appointments: newAppointment._id }
      });
    }

    // Create a notification for the patient
    const patientNotification = new Notification({
      message: `You have an appointment scheduled on ${date} at ${time}.`,
      recipient: patientId,
      recipientType: 'Patient'
    });
    await patientNotification.save();

    // Add notification reference to the patient
    await Patient.findByIdAndUpdate(
      patientId,
      { $push: { notifications: patientNotification._id } },
      { new: true }
    );

    // Create a notification for the doctor
    const doctorNotification = new Notification({
      message: `You have a new appointment scheduled with a patient on ${date} at ${time}.`,
      recipient: doctorId,
      recipientType: 'Doctor'
    });
    await doctorNotification.save();

    // Add notification reference to the doctor
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { notifications: doctorNotification._id } },
      { new: true }
    );

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error); // Log the error details
    res.status(400).json({ message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { cancelReason } = req.body;
    const appointmentId = req.params.uid; // Appointment ID from URL parameter

    // Find the appointment and update its cancelReason
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { cancelReason: cancelReason, status: 'Cancelled' } }, // Update cancelReason and status
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




module.exports = {
    NewPatientSignUp,
    findAllPatient,
    findPatientByEmail,
    addNewPostById,
    getAllPostbyId,
    findPostByIdDelete,
    findPatientById,
    updatePostAtIndex,
    createAppointment,
    cancelAppointment,
    setupTwoFactor,
    verifyTwoFactor,
}