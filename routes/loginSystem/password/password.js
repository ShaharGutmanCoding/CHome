const {Router} = require('express');
const router = Router();
const path = require('path');
const users = require('../../../scheme/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../../../config');
const cookieParser = require('cookie-parser');
const transporter = nodemailer.createTransport(config.email);


router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../../public/password/password.html');
    res.sendFile(file);
})

router.post('/sendEmail', async(req,res) => {
    const email = req.body?.email;
    const resetToken = Math.floor(100000 * Math.random() * 900000).toString();
    try {
        const user = await users.findOne({email: email});

        try {
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 1000 * 60 * 60;
            await user.save();
        } catch (error) {
            console.error(error);
            return res.send('something went wrong');
        }

    }catch (error){
        console.error(error);
        return res.send('something went wrong');
    } 

    await sendPasswordResetEmail(email, resetToken);

    res.cookie('userEmail', email, {maxAge: 1000 * 60 * 60})
    res.send('email sent successfully');
})

router.post('/checkCode', async (req, res) => {
    const code = req.body?.code;
    const email = req.cookies?.userEmail;
  
    if (!code || !email) {
      return res.status(400).json({ message: 'code or email not provided' });
    }
  
    try {
      const user = await users.findOne({ email, resetPasswordToken: code });
  
      if (!user) {
        return res.status(400).json({ message: 'code is wrong or invalid' });
      }
  
      res.cookie('validCode', true, { maxAge: 1000 * 60 * 5 });
      return res.status(200).json({ message: 'code is valid' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'something went wrong' });
    }
});

async function sendPasswordResetEmail(email, token){
    await transporter.sendMail({
        from:'chomeproject300@gmail.com',
        to: email,
        subject: 'password reset',
        text: `the code to reset your password is ${token}`
    })
}

module.exports = router;