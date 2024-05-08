
const {Router} = require('express');
const router = Router();
const path = require('path');

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../../public/login/login.html');
    res.sendFile(file);
})

router.post('/checkIfExist',async(req,res) =>{
    //check in data base
    var isUserExist;
if(isUserExist)
    res.send({check:true, redirect:"/homePage"})
else
    res.send({check:false, message:"username or password are not correct"})
})
module.exports = router;

