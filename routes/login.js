const { Router } = require('express');

var router = Router();
 
/* GET login page. */
 router.get('/',(req,res)=>{  
     res.render('login', { user: (req.session.user === undefined ? "" : req.session.user) });
 });

module.exports = router;
