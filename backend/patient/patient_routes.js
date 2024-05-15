const PatientController = require ('../patient/patient_controller');
// const { validationResult } = require('express-validator');

module.exports = app => { 
    app.get('/patient/api/test',(req,res)=>{res.json({message:"the api is working"})});
    
    //New Patient Sign Up
    app.post('/patient/api/signup', PatientController.NewPatientSignUp);
}
