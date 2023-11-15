const Users = require('../models/user_model');



const NewUserSignUp = (req, res) => {
    Users.User.create(req.body)
    .then((newUser) => {
        res.json({newUser: newUser, status:"Successfully registered user."})
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong. Please try again.', error:err})
    });
}

const userEmail = 'user@example.com';

const addNewPost = (req, res) => {
    const userEmail = req.body.email; // Assuming you pass user email in the request body
    const newPostContent = req.body.post; // Assuming you pass new post content in the request body

    Users.User.findOne({ email: userEmail })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.post.push(newPostContent);
            return user.save();
        })
        .then(updatedUser => {
            res.json({ updatedUser, message: 'New post added successfully' });
        })
        .catch(error => {
            res.json({ message: 'Error adding post', error });
        });
}

module.exports = {
    NewUserSignUp,
    addNewPost
}