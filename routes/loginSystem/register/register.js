
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
    let firstName = req.body?.firstName;
    let lastName = req.body?.lastName;
    let password = req.body?.password;
    let region = req.body?.firstName;
    let city = req.body?.firstName;
    let id = req.body?.id;
    let phoneNum = req.body?.phoneNum;
    let email = req.body?.email;

    console.log(userName);
    if (userName && password && id && phoneNum && email ) {
        let response = await users.create({firstName: firstName, lastName: lastName, password: password, region: region, city: city, id: id, phoneNum: phoneNum, email: email});
        res.send(response);
    }
})
module.exports = router;
