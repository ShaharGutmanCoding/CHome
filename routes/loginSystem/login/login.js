
const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');
const cookieParser = require('cookie-parser');

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../../public/login/login.html');
    res.sendFile(file);
})

router.post('/checkIfExist',async(req,res) =>{
    //check in data base
    const {email, password} = req.body;
    if(req.cookies?.isLogged){

    }
    let user = await findByEmail(email);
    
    if(user){
        if (user.password == password) {
            res.cookie('isLogged', 'true', {maxAge: 1000 * 60 * 60 * 24});
            res.cookie('email', user.email, {maxAge: 1000 * 60 * 60 * 24});
            res.cookie('firstName', user.firstName, {maxAge: 1000 * 60 * 60 * 24});
            res.json({flag:true, router:"/"});
        }else{
            res.json({flag:false, error:'password inncorrect, try again'});
        }
    }else{
        res.json({flag:false, error:'user not found, try again'});
    }
});

async function findByEmail(email){
    try{
        const documents = await users.findOne({email: email});
        return documents;
    }
    catch(err){
        console.error(err);
        return null;
    }
}


module.exports = router;

