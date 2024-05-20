const {Router} = require('express');
const express = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../../public/request/request.html');
    res.sendFile(file);
})

router.post('/newCall',async(req,res) => {
    let category = req.body?.category;
    let date = req.body?.date;
    let description = req.body?.date;

    if(category && date && description){    
        await ticket.create({category: category, date: date, description: description,})
    }
})

module.exports = router;
