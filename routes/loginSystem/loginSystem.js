
const {Router} = require('express');
const router = Router();

const login = require('./login/login');
const register = require('./register/register');
const password = require('./password/password')
const change = require('./change/change');

router.use('/login', login);
router.use('/register', register);
router.use('/forgetPassword',password);
router.use('/changePassword', change);

module.exports = router;