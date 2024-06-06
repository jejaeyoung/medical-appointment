const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    middleInitial: String,
    email: String,
    password: String,
    dob: String,
    age: Number,
    contactNumber: String,
    gender: String,
    role: String,
    twoFactorSecret: String
});

const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;
