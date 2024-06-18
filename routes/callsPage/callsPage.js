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
        res.json(calls);
        return;
    }
    catch(err){
        console.error(err);
    }
});

router.post("/addHelperAndHelpingSuggestion",async (req,res)=>{
    const{helperEmail, givenID} = req.body;

    const filter = { _id: givenID }; 
    const update = {
      $push: { helpers: helperEmail}
    };
    try{
        await ticket.updateOne(filter,update);
        return;
    }
    catch(err){
        console.error(err);
    }
    await ticket.updateOne(filter,update);

    filter = { email: helperEmail }; 
    update = {
      $push: { helpingSuggestions: givenID}
    };
    await users.updateOne(filter,update);

    let helpedTicket = await ticket.findOne({_id: givenID});
    if(helpedTicket.status==="waiting for helper"){
        helpedTicket.status="waiting for a response from the sender"
        helpedTicket.save()
    }
    res.end();
})
module.exports = router;
