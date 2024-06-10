const {Router} = require('express');
const express = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');
const users = require('../../scheme/users');
const cookieParser = require('cookie-parser');
// const cookieParser = require('cookie-parser');

router.use('/',(req,res,next) => {
    if (!req.cookies?.isLogged) {
        res.redirect('/error');
        return ;
    }
    next();
})

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

async function checkIfEmailExist(email, loggedUser){
    const documents = await users.findOne({email: email});
    if(documents.email == loggedUser || !documents){
        console.log('doesnt exist');
        return false;
    }else{
        console.log('exist');
        return true;
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
    console.log(documents);
    if(documents){
        console.log(documents);
        res.json(documents);
    }else{
        res.send(null);
    }
})

router.post('/changeUserDetails', async(req,res) => {
    console.log('changing user info');
    const loggedUser = req.cookies?.email;
    const user = await findByEmail(loggedUser);

    console.log(user);

    let firstName = req.body?.firstName;
    let lastName = req.body?.lastName;
    let region = req.body?.region;
    let city = req.body?.city;
    let id = req.body?.id;
    let phoneNum = req.body?.phoneNum;
    let email = req.body?.email;

    console.log(firstName, lastName, id, region, city, phoneNum, email);

    let isEmailExist = await checkIfEmailExist(email, loggedUser);

    if (firstName && lastName && region && city && id && phoneNum && email && !isEmailExist){
        console.log('change');
        user.firstName = firstName;
        user.lastName = lastName;
        user.region = region;
        user.city = city;
        user.id = id;
        user.phoneNum = phoneNum;
        user.email = email;
        user.save();
        res.send('user info updated successfully')
    }else if(isEmailExist){
        console.log('email exist');
        res.send('email already exist in db, try another email');
    }else{
        console.log('general error');
        res.send('something went wrong, try again later');
    }

    console.log(user);

})

router.post('/deleteCall', async(req,res) => {
    let _id = req.body?._id;
    const documents = await ticket.find({_id: _id});
    console.log(documents);
    console.log(_id);

    if(documents){
        await ticket.deleteOne({_id: _id});
        console.log('request deleted successfully');
        res.send('request deleted successfully');
    }else{
        console.log('error');
        res.send(null);
    }
})

router.get('/calls', async (req,res) => {
    const loggedUser = req.cookies?.email;
    
})



module.exports = router;