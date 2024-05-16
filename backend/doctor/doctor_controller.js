const Doctors = require('./doctor_model');
const Post = require('../announcement/announcement_model');

const NewDoctorSignUp = (req, res) => {
    Doctors.create(req.body)
        .then((newDoctor) => {
            res.json({ newDoctor: newDoctor, status: "Successfully registered Doctor." });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong. Please try again.', error: err });
        });
};

const findAllDoctors = (req, res) => {
    Doctors.find()
        .populate('dr_posts')
        .then((allDataDoctors) => {
            res.json({ theDoctor: allDataDoctors });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};

// Get Doctor by ID
const findDoctorById = (req, res) => {
    Doctors.findOne({ _id: req.params.id })
        .populate('dr_posts')
        .then((theDoctor) => {
            res.json({ theDoctor });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};

const findDoctorByEmail = (req, res) => {
    Doctors.findOne({ email: req.params.email })
        .populate('dr_posts')
        .then((theDoctor) => {
            res.json({ theEmail: theDoctor });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err });
        });
};

// Add a new post
const addNewPostById = (req, res) => {
    const newPost = new Post({
        content: req.body.post, // Make sure the content is coming from req.body.post
        doctor: req.params.id,
    });

    newPost.save()
        .then((post) => {
            return Doctors.findByIdAndUpdate(
                req.params.id,
                { $push: { dr_posts: post._id } },
                { new: true }
            ).populate('dr_posts');
        })
        .then((updatedDoctor) => {
            res.json({ updatedDoctor, message: 'New post added successfully' });
        })
        .catch((error) => {
            res.json({ message: 'Error adding post', error });
        });
};

// Retrieve all posts for a doctor
const getAllPostbyId = (req, res) => {
    Doctors.findOne({ _id: req.params.id })
        .populate('dr_posts')
        .then((Doctor) => {
            if (!Doctor) {
                res.json({ message: 'Doctor not found' });
            }
            res.json({ posts: Doctor.dr_posts });
        })
        .catch((err) => {
            res.json({ message: 'Error retrieving posts', error: err });
        });
};

// Delete a post
const findPostByIdDelete = (req, res) => {
    Post.findByIdAndDelete(req.params.index)
        .then((deletedPost) => {
            return Doctors.findByIdAndUpdate(
                req.params.uid,
                { $pull: { dr_posts: req.params.index } },
                { new: true }
            ).populate('dr_posts');
        })
        .then((updatedDoctor) => {
            res.json({ updatedDoctor, message: 'Post deleted successfully' });
        })
        .catch((error) => {
            res.json({ message: 'Error deleting post', error });
        });
};

// Update a post
const updatePostAtIndex = (req, res) => {
    Post.findByIdAndUpdate(req.params.index, { content: req.body.post }, { new: true })
        .then((updatedPost) => {
            res.json({ updatedPost, message: 'Post updated successfully' });
        })
        .catch((error) => {
            res.json({ message: 'Error updating post', error });
        });
};

module.exports = {
    NewDoctorSignUp,
    findAllDoctors,
    findDoctorByEmail,
    addNewPostById,
    getAllPostbyId,
    findPostByIdDelete,
    findDoctorById,
    updatePostAtIndex
};
