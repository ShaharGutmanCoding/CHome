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

router.get('/profileDetails', async (req,res) =>{
    const loggedUser = req.cookies?.email;
    const user = await findByEmail(loggedUser);
    res.json(user);
})

router.get('/request', async (req,res) => {
    const loggedUser = req.cookies?.email;
    try{
        const documents = await ticket.find({createdBy: loggedUser});
        return res.json(documents);
    }
    catch(err){
        console.error(err);
        return res.send(null);
    }
})

router.post('/changeUserDetails', async(req,res) => {
    const loggedUser = req.cookies?.email;
    const user = await findByEmail(loggedUser);
    const requests = await findTicketCreatorByEmail(loggedUser);
    const {firstName, lastName, region, city, id, phoneNum} = req.body;
    const email = req.body?.email;
    const isEmailExist = await checkIfEmailExist(email, loggedUser);

    if(isEmailExist){
        return res.send('email already exist in db, try another email');
    }
    if (firstName && lastName && region && city && id && phoneNum && email){
        try{
            user.firstName = firstName;
            user.lastName = lastName;
            user.region = region;
            user.city = city;
            user.id = id;
            user.phoneNum = phoneNum;
            user.email = email;
            await user.save();

            requests.forEach(async request=>{
                request.name = firstName;
                request.createdBy = email;
                await request.save();
            });
            res.cookie('email', email, {maxAge: 1000 * 60 * 60 * 24});
            res.cookie('firstName', firstName, {maxAge: 1000 * 60 * 60 * 24});
            return res.send('user info updated successfully');
        }catch(err){
            console.error(err);
            return res.send('something went wrong, try again later');
        }
    }else{
        return res.send('something went wrong, try again later');
    }
})

router.post('/deleteRequest', async(req,res) => {
    let _id = req.body?._id;

    try{
        await ticket.deleteOne({_id: _id});
        return res.send('request deleted successfully');
    }
    catch(err){
        console.error(err);
        return res.send(null);
    }
})

router.get('/calls', async (req,res) => {
    const loggedUser = req.cookies?.email;

    try{
        const documents = await ticket.find({helpers: loggedUser});
        return res.json(documents);
    }
    catch(err){
        console.error(err);
        res.send(null);
    }
})

router.post('/deleteCall', async(req,res) => {
    let _id = req.body?._id;
    const loggedUser = req.cookies?.email;

    try{
        await ticket.updateOne(
            { _id: _id },
            { $pull: { helpers: loggedUser } }
        );
        return res.send('call deleted successfully');
    }
    catch(err){
        console.error(err);
        re.send(null);
    }
})

router.post('/getUser',async(req,res)=>{
    let email = req.body?.email;

    try{
        const user = await users.findOne({email: email});
        return res.json(user);
    }
    catch(err){
        console.error(err);
        return res.send('server error');
    }
})

router.post("/updateNumOfHelps",async(req,res)=>{
    let email = req.body.email;
    try {
        const user = await users.findOne({email: email});
        user.numOfHelps++;
        await user.save();
    } catch (error) {
        console.error(error);
    }

})

async function findByEmail(email){
    try{
        const documents = await users.findOne({email: email});
        return documents;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

async function checkIfEmailExist(email, loggedUser) {
    try {
        const documents = await users.findOne({ email: email });
        // Check if documents is null before accessing properties
        if (!documents || documents.email === loggedUser) {
            // Email doesn't exist or is the logged user's email
            return false;
        } else {
            // Email exists and is not the logged user's email
            return true;
        }
    } catch (err) {
        console.error('Error checking if email exists:', err);
        return false;
    }
}

async function findTicketCreatorByEmail(email){
    try{
        const documents = (await ticket.find({createdBy: email}));
        return documents;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

module.exports = router;