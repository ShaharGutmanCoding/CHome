
const {Router} = require('express');
const router = Router();

const login = require('./login/login');
const register = require('./register/register');

router.use('/login', login);
router.use('/register', register);

module.exports = router;