

const mongoose = require('mongoose');
const MedicalSecretary = require('./medicalsecretary_model');
const Appointment = require('../appointments/appointment_model');

const NewMedicalSecretaryignUp = (req, res) => {
    MedicalSecretary.create(req.body)
        .then((newMedicalSecretary) => {
            res.json({ newMedicalSecretary: newMedicalSecretary, status: "Successfully registered Medical Secretary." });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong. Please try again.', error: err });
        });
};

const findAllMedicalSecretary = (req, res) => {
    MedicalSecretary.find()
        .then((allDataMedicalSecretary) => {
            res.json({ theMedicalSecretary: allDataMedicalSecretary });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};

// Get Doctor by ID
const findDoctorById = (req, res) => {
    MedicalSecretary.findOne({ _id: req.params.id })
        .populate('dr_posts')
        .then((theDoctor) => {
            res.json({ theDoctor });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};

const findDoctorByEmail = (req, res) => {
    MedicalSecretary.findOne({ email: req.params.email })
        .populate('dr_posts')
        .then((theDoctor) => {
            res.json({ theEmail: theDoctor });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};


module.exports = {
    NewMedicalSecretaryignUp,
    findAllMedicalSecretary,
    findDoctorByEmail,
    findDoctorById,

};
