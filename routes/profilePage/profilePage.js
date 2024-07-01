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
        res.json(documents);
        return;
    }
    catch(err){
        console.error(err);
        res.send(null);
    }

    res.end();
})

router.post('/changeUserDetails', async(req,res) => {
    const loggedUser = req.cookies?.email;
    const user = await findByEmail(loggedUser);
    const requests = await findTicketCreatorByEmail(loggedUser);
    const {firstName, lastName, region, city, id, phoneNum} = req.body;
    let email = req.body.email;
    let isEmailExist = await checkIfEmailExist(email, loggedUser);

    if(isEmailExist){
        res.send('email already exist in db, try another email');
        return;
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
                await request.save();
            });

            res.send('user info updated successfully')
            return;
        }catch(err){
            console.error(err);
            res.send('something went wrong, try again later');
        }
    }else{
        res.send('something went wrong, try again later');
    }
})

router.post('/deleteRequest', async(req,res) => {
    let _id = req.body?._id;

    try{
        await ticket.deleteOne({_id: _id});
        res.send('request deleted successfully');
        return;
    }
    catch(err){
        console.error(err);
        res.send(null);
    }
})

router.get('/calls', async (req,res) => {
    const loggedUser = req.cookies?.email;

    try{
        const documents = await ticket.find({helpers: loggedUser});
        res.json(documents);
        return;
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
        res.send('call deleted successfully');
        return;
    }
    catch(err){
        console.error(err);
        re.send(null);
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


router.post('/getUser',async(req,res)=>{
    let email = req.body?.email;

    try{
        const user = await users.findOne({email: email});
        res.json(user);
    }
    catch(err){
        console.error(err);
        res.send('server error');
    }
})

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


router.post("/updateNumOfHelps",async(req,res)=>{
    let email = req.body.email;
    let user = await users.findOne({email: email});
user.numOfHelps++;
user.save();

})

module.exports = router;