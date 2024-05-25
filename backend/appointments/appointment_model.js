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
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    }
}, { timestamps: true });

const Appointment = model('Appointment', AppointmentSchema);
module.exports = Appointment;
