
const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../../../public/register/register.html');
    res.sendFile(file);
})

router.post('/createUser', async(req,res) => {
    console.log('creating user');
    let userName = req.body?.userName;
    let password = req.body?.password;
    let id = req.body?.id;
    let phoneNum = req.body?.phoneNum;
    let email = req.body?.email;

    console.log(userName);
    if (userName && password && id && phoneNum && email ) {
        let response = await users.create({userName: userName, password: password, id: id, phoneNum: phoneNum, email: email});
        res.send(response);
    }
})
module.exports = router;
