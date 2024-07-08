
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
            await users.create({firstName: firstName, lastName: lastName, password: password, region: region, city: city, id: id, phoneNum: phoneNum, email: email, registerDate:getCurrentDate()});
            return res.send('user created successfully');
        }
        catch(err){
            console.error(err);
            return res.send('something went wrong, try again');
        }
    }
})

function getCurrentDate() {
    let now = new Date();
    let date = now.toLocaleDateString();
    return `${date}`;
  }

module.exports = router;
