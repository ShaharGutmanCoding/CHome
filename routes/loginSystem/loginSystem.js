const express = require('express');
const router = express.Router();

const login = require('./login/login');
const register = require('./register/register');

router.use('/login', login);
router.use('/register', register);

module.exports = router;