
const {Router} = require('express');
const router = Router();

const loginSystem = require('./loginSystem/loginSystem');
const requestPage = require('./requestPage/requestPage');
const callsPage = require('./callsPage/callsPage.js');
const profilePage = require('./requestPage/requestPage.js')

router.get('/', (req, res) => {
    res.redirect('/loginSystem/login');
})

router.use('/loginSystem', loginSystem);
router.use('/requestPage', requestPage);
router.use('/callsPage', callsPage);
router.use('/profilePage',profilePage)

module.exports = router;
