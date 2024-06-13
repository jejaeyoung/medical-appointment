const Doctors = require('./doctor_model');
const Post = require('../announcement/announcement_model');
const Patient = require('../patient/patient_model');
const Appointment = require('../appointments/appointment_model');
const MedicalSecretary = require('../medicalsecretary/medicalsecretary_model');
const Prescription = require('../prescription/prescription_model');
const path = require('path');

const mongoose = require('mongoose');
const QRCode = require('qrcode');
const speakeasy = require('speakeasy');


const nodemailer = require('nodemailer');


//For Email


// Generate and send OTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'testotpsender@gmail.com',
      pass: 'vqbi dqjv oupi qndp'
  }
});

// Generate and send OTP
const sendOTP = async (req, res) => {
    try {
        // Try to find the user in Doctors collection first
        let user = await Doctors.findOne({ dr_email: req.body.email });
  
        if (!user) {
            // If no doctor is found, try to find the patient
            user = await Patient.findOne({ patient_email: req.body.email });
  
            if (!user) {
                return res.status(404).send('User not found');
            }
        }
  
        const otp = speakeasy.totp({
            secret: user.twoFactorSecret,
            encoding: 'base32'
        });
  
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
        await user.save();
  
        // Send OTP email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.dr_email || user.patient_email, // Ensure correct email field is used
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };
  
        await transporter.sendMail(mailOptions);
  
        res.status(200).send('OTP sent');
    } catch (error) {
        console.error('Error sending OTP:', error); // Log error for debugging
        res.status(500).send('Error sending OTP');
    }
  };

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
      const patient = await Doctors.findOne({ dr_email: req.body.email });
      if (!patient) {
          return res.status(404).send('Patient not found');
      }

      if (patient.otp !== req.body.otp || new Date() > patient.otpExpires) {
          return res.status(400).send('Invalid or expired OTP');
      }

      // Clear OTP fields after successful verification
      patient.otp = undefined;
      patient.otpExpires = undefined;
      await patient.save();

      res.status(200).send('OTP verified');
  } catch (error) {
      res.status(500).send('Error verifying OTP');
  }
};
const setupTwoFactorForDoctor = async (req, res) => {
    try {
      const doctor = await Doctors.findById(req.params.id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      let secret;
      if (!doctor.twoFactorSecret || req.body.regenerate) {
        secret = speakeasy.generateSecret({ length: 30 });
        doctor.twoFactorSecret = secret.base32;
        doctor.twoFactorEnabled = true;
        await doctor.save();
      } else {
        secret = { base32: doctor.twoFactorSecret };
      }
  
      console.log('Stored Secret in DB:', doctor.twoFactorSecret);
  
      const otpAuthUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: `Landagan Kids Clinic:${doctor.dr_email}`,
        issuer: 'Landagan Kids Clinic',
        encoding: 'base32'
      });
  
      console.log('OTP Auth URL:', otpAuthUrl);
  
      const qrCode = await QRCode.toDataURL(otpAuthUrl);
  
      console.log('Generated Secret:', secret.base32);
  
      res.json({ qrCode, secret: secret.base32 });
    } catch (error) {
      console.error('Error generating 2FA secret:', error);
      res.status(500).json({ message: 'Error generating 2FA secret', error });
    }
  };
  
  
  // Verify Two-Factor Function
  const verifyTwoFactor = async (req, res) => {
    const { userId, token } = req.body;
  
    try {
      const doctor = await Doctors.findById(userId);
      if (!doctor) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      if (!doctor.twoFactorEnabled) {
        return res.status(400).json({ message: '2FA not enabled for this patient' });
      }
  
      if (!token) {
        return res.status(400).json({ message: '2FA token is required' });
      }
  
      console.log(`Verifying token: ${token} for user ${userId}`);
      console.log(`Secret key: ${doctor.twoFactorSecret}`);
  
      const verified = speakeasy.totp.verify({
        secret: doctor.twoFactorSecret,
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



const NewDoctorSignUp = (req, res) => {
    Doctors.create(req.body)
        .then((newDoctor) => {
            res.json({ newDoctor: newDoctor, status: "Successfully registered Doctor." });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong. Please try again.', error: err });
        });
};
const updateDoctorDetails = (req, res) => {
    const updateData = {
      dr_firstName: req.body.dr_firstName,
      dr_lastName: req.body.dr_lastName,
      dr_middleInitial: req.body.dr_middleInitial,
      dr_contactNumber: req.body.dr_contactNumber,
      dr_dob: req.body.dr_dob,
      dr_email: req.body.dr_email,
      dr_password: req.body.dr_password
    };
    Doctors.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true, runValidators: true })
      .then((updatedDoctor) => {
        res.json({ updatedDoctor: updatedDoctor, message: "Successfully updated the doctor" });
      })
      .catch((err) => {
        res.json({ message: 'Something went wrong', error: err });
      });
};
const findAllDoctors = (req, res) => {
    Doctors.find()
        .populate('dr_posts')
        .then((allDataDoctors) => {
            res.json({ theDoctor: allDataDoctors });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};
const updateDoctorImage = async (req, res) => {
    try {
      const doctorId = req.params.id;
      const imagePath = `images/${req.file.filename}`; // Store relative path
  
      // Update the doctor's image path in the database
      const updatedDoctor = await Doctors.findByIdAndUpdate(doctorId, { dr_image: imagePath }, { new: true });
  
      res.json({ updatedDoctor, message: 'Doctor image updated successfully' });
    } catch (error) {
      console.error('Error updating doctor image:', error);
      res.status(500).json({ message: 'Error updating doctor image', error });
    }
};
// Get Doctor by ID
const findDoctorById = (req, res) => {
    Doctors.findOne({ _id: req.params.id })
        .populate('dr_posts')
        .then((theDoctor) => {
            res.json({ theDoctor });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};
const findDoctorByEmail = (req, res) => {
    Doctors.findOne({ email: req.params.email })
        .populate('dr_posts')
        .then((theDoctor) => {
            res.json({ theEmail: theDoctor });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};
// Add a new post
const addNewPostById = (req, res) => {
    const newPost = new Post({
        content: req.body.content, 
        doctor_id: req.params.id,
    });

    newPost.save()
        .then((post) => {
            return Doctors.findByIdAndUpdate(
                req.params.id,
                { $push: { dr_posts: post._id } },
                { new: true }
            ).populate('dr_posts');
        })
        .then((updatedDoctor) => {
            res.json({ updatedDoctor, message: 'New post added successfully' });
        })
        .catch((error) => {
            res.json({ message: 'Error adding post', error });
        });
};
// Retrieve all posts 
const getAllPostbyId = (req, res) => {
    Doctors.findOne({ _id: req.params.id })
        .populate('dr_posts')
        .then((Doctor) => {
            if (!Doctor) {
                res.json({ message: 'Doctor not found' });
            }
            res.json({ posts: Doctor.dr_posts });
        })
        .catch((err) => {
            res.json({ message: 'Error retrieving posts', error: err });
        });
};
const findPostByIdDelete = async (req, res) => {
    const postIndex = req.params.index;
    const doctorId = req.params.id;

    try {
        // Find the doctor document
        const doctor = await Doctors.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Ensure that the postIndex is a valid index in the dr_posts array
        if (postIndex < 0 || postIndex >= doctor.dr_posts.length) {
            return res.status(400).json({ message: 'Invalid post index' });
        }

        // Extract the post ID to be deleted
        const postIdToDelete = doctor.dr_posts[postIndex];

        // Delete the post from the Post collection
        const deletedPost = await Post.findByIdAndDelete(postIdToDelete);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Remove the post reference from the doctor's dr_posts array
        doctor.dr_posts.splice(postIndex, 1);

        // Save the updated doctor document
        const updatedDoctor = await doctor.save();

        res.json({ updatedDoctor, message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error deleting post', error });
    }
};
const updatePostAtIndex = async (req, res) => {
    const { id: doctorId, index } = req.params;
    console.log('Received Doctor ID:', doctorId);
    console.log('Received Post Index:', index);

    // Validate Doctor ID
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    try {
        const doctor = await Doctors.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if the index is within bounds
        if (index < 0 || index >= doctor.dr_posts.length) {
            return res.status(400).json({ message: 'Invalid post index' });
        }

        // Get the post ID from the doctor's dr_posts array
        const postId = doctor.dr_posts[index];

        // Update the content of the post
        const updatedPost = await Post.findByIdAndUpdate(postId, { content: req.body.content }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ updatedPost, message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Error updating post', error });
    }
};
//For Appointments
const getAllAppointments = (req, res) => {
    const { doctorId } = req.params;
    
    Appointment.find({ doctor: doctorId })
      .populate('patient')
      .populate('doctor')
      .populate('secretary')
      .sort({ date: 1, time: 1 })
      .then((appointments) => {
        res.status(200).json(appointments);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  };

  const completeAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.uid; // Appointment ID from URL parameter

        // Find the appointment and update its status to 'Completed'
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: 'Completed' },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Get doctor and patient IDs from the appointment
        const doctorId = updatedAppointment.doctor;
        const patientId = updatedAppointment.patient;

        // Update doctor's list of patients if the patient is not already in the list
        await Doctors.findByIdAndUpdate(
            doctorId,
            { $addToSet: { dr_patients: patientId } }, // AddToSet ensures no duplicates
            { new: true }
        );

        // Create a notification for the patient
        const notification = new Notification({
            message: `Your appointment with Dr. ${doctorId} has been completed.`,
            patient: patientId
        });
        await notification.save();

        // Add notification reference to the patient
        await Patient.findByIdAndUpdate(
            patientId,
            { $push: { notifications: notification._id } },
            { new: true }
        );

        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const acceptPatient = async (req, res) => {
    try {
        const appointmentId = req.params.uid; // Appointment ID from URL parameter

        // Find the appointment and update its status to 'Completed'
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: 'Scheduled' },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Get doctor and patient IDs from the appointment
        const doctorId = updatedAppointment.doctor;
        const patientId = updatedAppointment.patient;

        // Update doctor's list of patients if the patient is not already in the list
        await Doctors.findByIdAndUpdate(
            doctorId,
            { $addToSet: { dr_patients: patientId } }, // AddToSet ensures no duplicates
            { new: true }
        );

        // Create a notification for the patient
        const notification = new Notification({
            message: `Your appointment with Dr. ${doctorId} has been scheduled.`,
            patient: patientId
        });
        await notification.save();

        // Add notification reference to the patient
        await Patient.findByIdAndUpdate(
            patientId,
            { $push: { notifications: notification._id } },
            { new: true }
        );

        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



//For Prescription
const createPrescription = async (req, res) => {
    const { patientId, appointmentId } = req.params;
    const { gender, dateOfConsultation, doctor, medications } = req.body;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const prescription = new Prescription({
            patient: patientId,
            appointment: appointmentId,
            gender,
            dateOfConsultation,
            doctor,
            medications
        });

        await prescription.save();

        // Update the patient's record to include the new prescription
        const patient = await Patient.findById(patientId);
        if (patient) {
            patient.prescriptions.push(prescription._id);
            await patient.save();
        }

        // Update the doctor's record to include the new prescription
        const doctorRecord = await Doctors.findById(doctor);
        if (doctorRecord) {
            doctorRecord.dr_prescriptions.push(prescription._id);
            await doctorRecord.save();
        }

        // Update the appointment to include the new prescription
        appointment.prescription = prescription._id;
        await appointment.save();

        res.status(201).json({ message: 'Prescription created successfully', prescription });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getPrescriptionsByDoctor = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const prescriptions = await Prescription.find({ doctor: doctorId })
            .populate('patient')
            .populate('doctor')
            .populate('appointment');

        if (!prescriptions.length) {
            return res.status(404).json({ message: 'No prescriptions found for this doctor' });
        }

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};


//Getting the patient
const getPatientsByDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        // Find the doctor and populate the dr_patients field
        const doctor = await Doctors.findById(doctorId).populate('dr_patients');

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json(doctor.dr_patients);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




module.exports = {
    NewDoctorSignUp,
    findAllDoctors,
    findDoctorByEmail,
    addNewPostById,
    getAllPostbyId,
    findPostByIdDelete,
    findDoctorById,
    updatePostAtIndex,
    getAllAppointments,
    completeAppointment,
    updateDoctorImage,
    updateDoctorDetails,
    createPrescription,
    getPrescriptionsByDoctor,
    getPatientsByDoctor,
    acceptPatient,
    setupTwoFactorForDoctor,
    verifyTwoFactor,
    sendOTP,
    verifyOTP,
};
