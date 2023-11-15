const UserController = require ('../controllers/user_controller');
// const { validationResult } = require('express-validator');

module.exports = app => { 
    app.get('/api/test',(req,res)=>{res.json({message:"the api is working"})});
    app.post('/api/medapp/signup', UserController.NewUserSignUp);
    app.post('/api/medapp/addpost', UserController.addNewPost);

}