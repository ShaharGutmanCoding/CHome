const {Router} = require('express');
const router = Router();
const path = require('path');

router.get('/',(req,res)=>{
    const file = path.join(__dirname + '../../../public/about/about.html');
    res.sendFile(file);
});

module.exports = router;