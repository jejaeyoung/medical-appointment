const mongoose = require ('mongoose')
const {Schema, model} = mongoose

const DoctorSchema = new Schema({
    dr_firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    dr_lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    dr_middleInitial: {
        type: String,
        maxlength: 1
    },
    dr_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v); //regex to validate __@__.__ i.e. xyz@abc.com
            },
            message: props => '${props.value} is not a valid email address.'
        }
    },
    dr_password: {
        type: String,
        required: true,
        minlength: 6,
    },
    dr_dob: {
        type: Date,
        required: true,
    },
    dr_joinedAt: {
        type: Date,
        required: true,

    },
    dr_contactNumber: {
        type: String,
        required: true,
        unique: true,
        
    }
})

const Doctor = model('Doctor', DoctorSchema)