const { Router } = require('express');
const User = require('../controllers/user');
const loginValidation = require('../middlewares/loginValidation');
const registerValidation = require('../middlewares/registerValidation');

const userRoute = Router();

userRoute.post('/login', loginValidation, User.login);
userRoute.post('/register', registerValidation, User.register);

module.exports = userRoute;
