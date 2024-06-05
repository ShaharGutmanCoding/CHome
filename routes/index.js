
const {Router} = require('express');
const router = Router();

const loginSystem = require('./loginSystem/loginSystem');
const requestPage = require('./requestPage/requestPage.js');
const callsPage = require('./callsPage/callsPage.js');
const homePage = require('./homePage/homePage');
const profilePage = require('./profilePage/profilePage.js');
const error = require('./error/error.js');
const about = require('./about/about.js');

router.use('/loginSystem', loginSystem);
router.use('/requestPage', requestPage);
router.use('/callsPage', callsPage);
router.use('/profilePage',profilePage);
router.use('/error',error);
router.use('/about',about);
router.use('/',homePage);

module.exports = router;
