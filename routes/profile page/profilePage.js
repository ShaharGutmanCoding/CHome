const {Router} = require('express');
const express = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');
// const cookieParser = require('cookie-parser');

router.get('/',(req,res) => {
    const file = path.join(__dirname + '../../public/profilePage/profilePage.html');
    res.sendFile(file);
})


router.get('/profileDetails', (req,res) =>{
    const logedUser = req.cookies.email;
    
})