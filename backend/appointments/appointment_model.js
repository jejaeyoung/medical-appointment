const mongoose = require('mongoose')
const {Schema, model} = mongoose

const AppointmentSchema = new Schema({
    appt_doctor: {
        required: true
    },
    appt_date: {
        type: Date,
        required: true,
    },
    appt_title: {
        type: String
    }
})

const Appointment = model('Appointment', AppointmentSchema)

module.exports= Appointment;