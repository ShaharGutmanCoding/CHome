const {Router} = require('express');
const express = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');
const users = require('../../scheme/users');

// router.use((req,res,next) => {
//     if(req.cookies?.isLogged){
//         next();
//     }else{
//         res.redirect('#')
//     }
// });

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../../public/request/request.html');
    res.sendFile(file);
});

router.post('/newCall',async(req,res) => {
    const loggedUser = req.cookies?.email;

    let category = req.body?.category;
    let date = req.body?.date;
    let description = req.body?.description;
    let name = req.body?.name;

    if(category && date && description && loggedUser){    
        await ticket.create({category: category, date: date, description: description, createdBy: loggedUser, name:name})
    }
});

router.post('/getUserName',async(req,res)=>{
    let email = req.body?.email;
    const user = await users.findOne({email: email});
console.log(user)
res.json(user);
})

module.exports = router;
