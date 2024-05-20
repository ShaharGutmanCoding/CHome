
const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../../../public/register/register.html');
    res.sendFile(file);
})

router.post('/createUser', async(req,res) => {
    let username = req.body?.username;
    let password = req.body?.password;
    let id = req.body?.id;
    let phoneNumber = req.body?.phoneNumber;
    let email = req.body?.email;

    if (!username && !password && !id && !phoneNumber && !email ) {
        await users.create({username: username, password: password, id: id, phoneNumber: phoneNumber, email: email});
    }
})
module.exports = router;
