const { Router } = require('express');
var router = Router();

/* GET forget password page. */
router.get('/',(req,res)=>{
    res.render('forget');
}) 

module.exports = router;
