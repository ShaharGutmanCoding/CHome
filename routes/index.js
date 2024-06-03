
const {Router} = require('express');
const router = Router();

const loginSystem = require('./loginSystem/loginSystem');
const requestPage = require('./requestPage/requestPage.js');
const callsPage = require('./callsPage/callsPage.js');
const homePage = require('./homePage/homePage.js');
const profilePage = require('./profilePage/profilePage.js')


router.use('/loginSystem', loginSystem);
router.use('/requestPage', requestPage);
router.use('/callsPage', callsPage);
router.use('/homePage', homePage);
router.use('/profilePage', profilePage);

module.exports = router;
