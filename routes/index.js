const express = require('express');
const router = express.Router();

const loginSystem = require('./loginSystem/loginSystem');
const requestPage = require('./requestPage/requestPage');
const caalsPage = require('./callsPage/callsPage');

router.use('/loginSystem', loginSystem);
router.use('/requestPage', requestPage);
router.use('/callsPage', caalsPage);

module.exports = router;
