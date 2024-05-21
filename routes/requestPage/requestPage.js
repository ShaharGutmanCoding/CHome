const {Router} = require('express');
const express = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');

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
    let category = req.body?.category;
    let date = req.body?.date;
    let description = req.body?.description;

    if(category && date && description){    
        await ticket.create({category: category, date: date, description: description,})
        res.statusCode(200).send('ticket created succsessfully');
    }else{
        res.statusCode(503).send('cant create ticket');
    }
});

module.exports = router;
