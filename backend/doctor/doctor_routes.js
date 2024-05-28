const DoctorController = require ('./doctor_controller');
// const { validationResult } = require('express-validator');
console.log("Doctor routes connected");
module.exports = app => { 
    app.get('/doctor/api/test',(req,res)=>{res.json({message:"the api is working"})});
    //For Registration
    app.post('/doctor/api/signup', DoctorController.NewDoctorSignUp);
 
    //For LogIn
    app.get('/doctor/api/alldoctor', DoctorController.findAllDoctors);

    //For Post
    app.post('/doctor/api/addpost/:id', DoctorController.addNewPostById);
    app.get('/doctor/api/finduser/:id', DoctorController.findDoctorById);
    app.get('/doctor/api/post/getallpost/:id', DoctorController.getAllPostbyId);
    app.delete('/doctor/api/post/deletepost/:id/:index', DoctorController.findPostByIdDelete);
    app.put('/doctor/api/post/updatepost/:id/:index', DoctorController.updatePostAtIndex);

    //For Appointments
    app.get('/doctor/appointments/:doctorId', DoctorController.getAllAppointments);
    app.put('/doctor/api/:uid/completeappointment', DoctorController.completeAppointment)

}
