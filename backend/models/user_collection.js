const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema, model} = mongoose

const UserSchema = new Schema ({
    firstName: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    role: {
        type: String,
        enum: ['Patient', 'Practitioner'],
        default:'Patient',
    }

})

UserSchema.method({
    async authenticate(password) {
       return bcrypt.compare(password, this.password);
    },
  }); 

const User = mongoose.model('User', UserSchema);
module.exports = User;