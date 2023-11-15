const UserController = require ('../controllers/user_controller');
// const { validationResult } = require('express-validator');

module.exports = app => { 
    app.post('/api/medapp/signup', UserController.NewUserSignUp);

}