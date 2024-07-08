const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../../../config');
const cookieParser = require('cookie-parser');
const transporter = nodemailer.createTransport(config.email);

router.use((req,res,next) =>{
    if(!req.cookies?.validCode){
        res.redirect('/error');
        return;
    }
    next();
})

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../../public/password/change.html');
    res.sendFile(file);
})

router.post('/changePassword', async (req,res) => {
    const newPassword = req.body?.newPassword;
    const email = req.cookies?.userEmail;
    try {
        const user = await users.findOne({email: email});

        if(!user){
            return res.json({flag: true, error: 'something went wrong, try again'});
        }

        try {
            user.password = newPassword;
            await user.save();
        } catch (error) {
            console.error(error);
            return res.json({flag: true, error: 'something went wrong'});
        }

    }catch (error){
        console.error(error);
        return res.json({flag: true, error: 'something went wrong'})
    } 

    res.json({flag: false});
});

module.exports = router;