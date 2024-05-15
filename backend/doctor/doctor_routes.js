const DoctorController = require ('./doctor_controller');
// const { validationResult } = require('express-validator');

module.exports = app => { 
    app.get('/doctor/api/test',(req,res)=>{res.json({message:"the api is working"})});
    
}
