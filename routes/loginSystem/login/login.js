
const {Router} = require('express');
const router = Router();
const path = require('path');

router.get('/',(req,res) =>{
    const file = path.join(__dirname + '../../../public/login/index.html');
    res.send(file);
})

module.exports = router;

