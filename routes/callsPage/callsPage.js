const {Router} = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../public/callsPage.html');
    res.sendFile(file);
})

module.exports = router;
