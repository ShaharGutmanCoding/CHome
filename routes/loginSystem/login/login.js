
const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../../public/login/login.html');
    res.sendFile(file);
})

async function findByName(name){
    const documents = await users.findOne({name:name});
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
    let username = req.body?.username;
    let password = req.body?.password;

    let user = await findByName(username);
    
    if(user){
        if (user.password == password) {
            res.json({flag:true, router:"#"})
        }else{
            res.json({flag:false, error:'password inncorrect, try again'})
        }
    }else{
        res.json({flag:false, error:'user not found, try again'})
    }
})

module.exports = router;

