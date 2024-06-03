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

router.post("/addHelper",async (req,res)=>{
    let helperEmail = req.body?.helperEmail;
    let givenID = req.body?.givenID;
    let helper = await users.findOne({email: helperEmail});
    console.log(helper.firstName+ " is willing to help to the user " +givenID);

    const filter = { _id: givenID }; 
    const update = {
      $push: { helpers: helper.firstName}
    };
    await ticket.updateOne(filter,update);
    res.end();
})
module.exports = router;
