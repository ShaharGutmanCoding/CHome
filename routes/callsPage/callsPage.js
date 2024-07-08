const {Router} = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');
const users = require('../../scheme/users');

router.use('/',(req,res,next) => {
    if (!req.cookies?.isLogged) {
        res.redirect('/error');
        return ;
    }
    next();
})

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../public/callsPage/callsPage.html');
    res.sendFile(file);
});

router.get("/getCalls", async(req,res)=>{
    try{
        var calls = await ticket.find();
        return res.json(calls);
    }
    catch(err){
        console.error(err);
    }
});

router.post("/addHelperAndHelpingSuggestion",async (req,res)=>{
    const{helperEmail, givenID} = req.body;

    let filter = { _id: givenID }; 
    let update = {
      $push: { helpers: helperEmail}
    };
  
    try {
        await ticket.updateOne(filter,update);
    } catch (error) {
        console.error(error);
    }

    filter = { email: helperEmail }; 
    update = {
      $push: { helpingSuggestions: givenID}
    };

    try {
        await ticket.updateOne(filter,update);
    } catch (error) {
        console.error(error);
    }

    try {
        let helpedTicket = await ticket.findOne({_id: givenID});
        if(helpedTicket.status==="הבקשה מחכה לאישור מאחד העוזרים באתר"){
            helpedTicket.status=' הבקשה נענתה על ידי אחד או יותר מהעוזרים באתר'
            helpedTicket.save()
        }
    } catch (error) {
        console.error(error);
    }
    res.end();
})

module.exports = router;