const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AppointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    secretary: {
        type: Schema.Types.ObjectId,
        ref: 'MedicalSecretary',
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    cancelReason: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Scheduled', 'Completed', 'Cancelled', 'Missed'],
        default: 'Pending'
    },
    medium :{
        type: String,
        enum: ['Online' , 'Face to Face'],
        required: true
   
    },
    payment :{
        type: String,
        required: true,
   
    },
    prescription: {
        type: Schema.Types.ObjectId,
        ref: 'Prescription'
    }
}, { timestamps: true });

const Appointment = model('Appointment', AppointmentSchema);
module.exports = Appointment;
