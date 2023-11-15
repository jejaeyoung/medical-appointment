const User = require('../models/user_collection');


const NewUserSignUp = (req, res) => {
    User.create(req.body)
    .then((newUser) => {
        res.json({newUser: newUser, status:"Successfully registered user."})
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong. Please try again.', error:err})
    });
}

module.exports = {
    NewUserSignUp,
}