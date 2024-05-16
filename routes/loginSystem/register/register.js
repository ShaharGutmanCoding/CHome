
const {Router} = require('express');
const router = Router();
const path = require('path');

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../../../public/register/register.html');
    res.sendFile(file);
})

router.post('/createUser', async(req,res) => {
    //create user in data base
})
module.exports = router;
