const {Router} = require('express');
const router = Router();

router.get('/',(req,res) => {
    const file = path.join(__dirname = '../../../public/request/request.html');
    res.sendFile(file);
})

module.exports = router;
