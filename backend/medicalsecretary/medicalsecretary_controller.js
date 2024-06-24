
const Post = require('../announcement/announcement_model');
const mongoose = require('mongoose');
const MedicalSecretary = require('./medicalsecretary_model');

const NewMedicalSecretaryignUp = (req, res) => {
    MedicalSecretary.create(req.body)
        .then((newDoctor) => {
            res.json({ newDoctor: newDoctor, status: "Successfully registered Doctor." });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong. Please try again.', error: err });
        });
};

const findAllMedicalSecretary = (req, res) => {
    MedicalSecretary.find()
        .populate('dr_posts')
        .then((allDataMedicalSecretary) => {
            res.json({ theDoctor: allDataMedicalSecretary });
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
