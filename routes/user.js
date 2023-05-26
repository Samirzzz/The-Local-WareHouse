const express = require("express");
var bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const User = require("../controllers/usercontrol");
/* GET SignUp page.
    /user/signup
*/
    router.get('/signup',(req,res)=>{  
    res.render('signup', { user: (req.session.user === undefined ? "" : req.session.user) });
    });
 
    router.get('/login',(req,res)=>{  
        res.render('login', { user: (req.session.user === undefined ? "" : req.session.user) });
    });

    router.post('/login', User.logs);
    router.post('/signup', User.AddUser);


    router.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

 module.exports = router;
