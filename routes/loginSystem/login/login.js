
const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../../public/login/login.html');
    res.sendFile(file);
})

async function findByObject(object){
    const documents = await users.findOne({email: object});
    if(documents){
        console.log(JSON.stringify(documents));
        return documents;
    }
    else{
        console.log('user not found')
        return false;
    }
}

router.post('/checkIfExist',async(req,res) =>{
    //check in data base
    let email = req.body?.email;
    let password = req.body?.password;
    if(req.cookies?.isLogged){

    }
    let user = await findByObject(email);
    
    if(user){
        if (user.password == password) {
            res.cookie('isLogged', 'true',{maxAge: 1000 * 60 * 60 * 24});
            res.cookie('email', user.email, {maxAge: 1000 * 60 * 60 * 24});
            res.json({flag:true, router:"#"});
        }else{
            res.json({flag:false, error:'password inncorrect, try again'});
        }
    }else{
        res.json({flag:false, error:'user not found, try again'});
    }
});

module.exports = router;

