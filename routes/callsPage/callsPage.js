const {Router} = require('express');
const router = Router();
const path = require('path');
const ticket = require('../../scheme/ticket');

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../public/callsPage/callsPage.html');
    res.sendFile(file);
})

router.get('/getCalls',async(req,res)=>{
let calls = await ticket.find();
res.json(calls);
})

module.exports = router;
