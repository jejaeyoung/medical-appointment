const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;

const PatientSchema = new Schema({
    // Personal info
    patient_ID: {
        type: String,
        unique: true
    },
    patient_firstName: {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    patient_middleInitial: {
        type: String,
        maxlength: 1
    },
    patient_lastName: {
        type: String,
        minlength: 2,
        maxlength: 20
    },
    patient_email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address.`
        }
    },
    patient_password: {
        type: String,
        minlength: 6,
    },
    patient_dob: {
        type: Date,
    },
    patient_contactNumber: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return v.length === 11;
            },
            message: props => `${props.value} has to be 11 characters long.`
        }
    },
    patient_gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    patient_appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    post: [{
        type: String
    }]
}, { timestamps: true });

// Pre-save hook for hashing the password
// PatientSchema.pre('save', async function (next) {
//     if (this.isModified('patient_password')) {
//         try {
//             const salt = await bcrypt.genSalt(10);
//             this.patient_password = await bcrypt.hash(this.patient_password, salt);
//         } catch (err) {
//             return next(err);
//         }
//     }
//     next();
// });

// Pre-save hook for generating the patient ID
PatientSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    const currentYear = new Date().getFullYear();

    try {
        const highestPatient = await this.constructor.findOne({ patient_ID: new RegExp(`^P${currentYear}`, 'i') })
            .sort({ patient_ID: -1 })
            .limit(1);
        let nextNumber = 1;
        if (highestPatient) {
            const lastNumber = parseInt(highestPatient.patient_ID.split('-')[1]);
            nextNumber = lastNumber + 1;
        }
        const paddedNumber = nextNumber.toString().padStart(6, '0');
        this.patient_ID = `P${currentYear}-${paddedNumber}`;
        next();
    } catch (error) {
        next(error);
    }
});

//Instance method for password authentication
PatientSchema.methods.authenticate = async function (password) {
    return bcrypt.compare(password, this.patient_password);
};

const Patient = model('Patient', PatientSchema);

module.exports = Patient;
