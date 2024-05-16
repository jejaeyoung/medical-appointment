const Doctors = require('./doctor_model');

const NewDoctorSignUp = (req, res) => {
    Doctors.create(req.body)
    .then((newDoctor) => {
        res.json({newDoctor: newDoctor, status:"Successfully registered Doctor."})
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong. Please try again.', error:err})
    });
} 

const findAllDoctors = (req, res) => {
    Doctors.find()
    .then((allDataDoctors) => {
      res.json({ theDoctor: allDataDoctors })
  })
  .catch((err) => {
      res.json({ message: 'Something went wrong', error: err })
  });
}

//getDoctor
const findDoctorById = (req, res) => {
  Doctors.findOne({_id:req.params.id})
      .then((theDoctor) => {
          res.json({theDoctor})
      })
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      });
}

const findDoctorByEmail = (req, res) => {
  Doctors.findOne({email:req.params.email})
      .then((theDoctor) => {
          res.json({theEmail : theDoctor})
      })
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      });
}

// Array New Post
const addNewPostById = (req, res) => {
    Doctors.findById({_id:req.params.id})
      .then((Doctor) => {
        if (!Doctor) {
          res.json({ message: 'Doctor not found' });
        }
        Doctor.post.unshift(req.body.post);
        return Doctor.save();
      })
      .then((updatedDoctor) => {
        res.json({ updatedDoctor, message: 'New post added successfully' });
      })
      .catch((error) => {
        res.json({ message: 'Error adding post', error });
      });
  };
  

//find posts by id Array 
const getAllPostbyId = (req, res) => {
    Doctors.findOne({ _id: req.params.id })
      .then((Doctor) => {
        if (!Doctor) {
          res.json({ message: 'Doctor not found' });
        }
          res.json({ posts: Doctor.post }); 
      })
      .catch((err) => {
        res.json({ message: 'Error retrieving posts', error: err });
      });
};

//Deleting by Id Array Post
const findPostByIdDelete = (req, res) => {
  Doctors.findById(req.params.uid)
    .then((Doctor) => {
      if (!Doctor) {
        return res.json({ message: 'Doctor not found' });
      }
        Doctor.post.splice(req.params.index, 1); 
        return Doctor.save()
          .then((updatedDoctor) => {
            res.json({ updatedDoctor, message: 'Post deleted successfully' });
          })
          .catch((error) => {
            res.json({ message: 'Error deleting post', error });
          });

    })
    .catch((error) => {
      res.json({ message: 'Error finding Doctor', error });
    });
};


const updatePostAtIndex = (req, res) => {
  Doctors.findById(req.params.id)
    .then((Doctor) => {
      if (!Doctor) {
        return res.json({ message: 'Doctor not found' });
      }
            Doctor.post[req.params.index] = req.body.post; 
            return Doctor.save()
          .then((updatedDoctor) => {
            res.json({ updatedDoctor, message: 'Post updated successfully' });
          })
          .catch((error) => {
            res.json({ message: 'Error updating post', error });
          });
    })
    .catch((error) => {
      res.json({ message: 'Error finding Doctor', error });
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
}