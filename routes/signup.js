const { Router } = require('express');
var router = Router();
 
/* GET SignUp page. */
    router.get('/',(req,res)=>{  
    res.render('signup', { user: (req.session.user === undefined ? "" : req.session.user) });
    });
 
 module.exports = router;
