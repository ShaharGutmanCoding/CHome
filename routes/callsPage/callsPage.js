const {Router} = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');
const users = require('../../scheme/users');

// router.use((req,res,next) => {
//     if(req.cookies?.isLogged){
//         next();
//     }else{
//         res.redirect('#')
//     }
// });

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../public/callsPage/callsPage.html');
    res.sendFile(file);
});

router.get("/getCalls", async(req,res)=>{
    var calls = await ticket.find();
    res.json(calls);
});

router.post("/addHelperAndHelpingSuggestion",async (req,res)=>{
    let helperEmail = req.body?.helperEmail;
    let givenID = req.body?.givenID;
    let helper = await users.findOne({email: helperEmail});
    console.log(helper.firstName+ " is willing to help to the user " +givenID);

    let filter = { _id: givenID }; 
    let update = {
      $push: { helpers: helper.email}
    };
    await ticket.updateOne(filter,update);

    filter = { email: helperEmail }; 
    update = {
      $push: { helpingSuggestions: givenID}
    };
    await users.updateOne(filter,update);


    res.end();
})


module.exports = router;
