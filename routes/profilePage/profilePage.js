const {Router} = require('express');
const express = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');
const users = require('../../scheme/users');
// const cookieParser = require('cookie-parser');

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../../public/profilePage/profilePage.html');
    res.sendFile(file);
})

async function findByEmail(email){
    const documents = await users.findOne({email: email});
    if(documents){
        console.log(JSON.stringify(documents));
        return documents;
    }
    else{
        console.log('user not found')
        return false;
    }
}

router.get('/profileDetails', async (req,res) =>{
    const loggedUser = req.cookies?.email;
    const user = await findByEmail(loggedUser);

    res.json(user);
})

router.get('/request', async (req,res) => {
    const loggedUser = req.cookies?.email;
    const documents = await ticket.find({createdBy: loggedUser});
    if(documents){
        console.log(JSON.stringify(documents));
        res.json( documents);
    }
})

router.get('/calls', async (req,res) => {
    const loggedUser = req.cookies?.email;
    
})


module.exports = router;