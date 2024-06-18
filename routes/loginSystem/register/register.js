
const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../../../public/register/register.html');
    res.sendFile(file);
})

router.post('/createUser', async(req,res) => {
    const {firstName, password, lastName, region, city, id, phoneNum, email} = req.body;

    if (firstName && lastName && password && region && city && id && phoneNum && email ) {
        try{
            let response = await users.create({firstName: firstName, lastName: lastName, password: password, region: region, city: city, id: id, phoneNum: phoneNum, email: email});
            res.send(response);
            return;
        }
        catch(err){
            console.error(err);
        }
    }
})

module.exports = router;
