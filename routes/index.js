
const {Router} = require('express');
const router = Router();

const loginSystem = require('./loginSystem/loginSystem');
const requestPage = require('./requestPage/requestPage.js');
const callsPage = require('./callsPage/callsPage.js');
const homePage = require('./homePage/homePage');
const profilePage = require('./requestPage/requestPage.js')


router.use('/loginSystem', loginSystem);
router.use('/requestPage', requestPage);
router.use('/callsPage', callsPage);
router.use('/profilePage',profilePage)
router.use('/',homePage)

module.exports = router;
