const {Router} = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');

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

module.exports = router;
