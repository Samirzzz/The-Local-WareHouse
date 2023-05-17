const { Router } = require('express');
var router = Router();

/* GET products page. */
router.get('/',(req,res)=>{
    res.render('product', { user: (req.session.user === undefined ? "" : req.session.user) });
}) 


module.exports = router;
