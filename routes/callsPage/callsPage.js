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
        res.end();
        return;
    }
    catch(err){
        console.error(err);
    }
})
module.exports = router;
