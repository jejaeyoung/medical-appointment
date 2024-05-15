const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema, model} = mongoose

const PatientSchema = new Schema ({

    //personal info

    patient_firstName: {
        type: String,
        required: true, //requireD daw dapat sabi sa google
        minlength: 3,
        maxlength: 20
    },
    patient_middleInitial: {
        type: String,
        maxlength: 1
    },
    patient_lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    patient_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v); //regex to validate __@__.__ i.e. xyz@abc.com
            },
            message: props => `${props.value} is not a valid email address.`
        }
    },
    patient_password: {
        type: String,
        required: true,
        minlength: 6,
    },
    patient_dob: {
        type: Date,
        required: true,
    },
    patient_joinedAt: {
        type: Date,
        required: true,
    },
    patient_contactNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return v.length == 11
            },
            message: props => `${props.value} has to be 11 characters long.`
        }
    },
    patient_gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    // role: {
    //     type: String,
    //     enum: ['Patient', 'Practitioner'],
    //     default:'Patient',
    //     required: true
    // },

    //not personal

    // patient_appts: {
    //     type: [AppointmentSchema]
    // }

})

PatientSchema.method({
    async authenticate(password) {
       return bcrypt.compare(password, this.password);
    },
  }); 

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;