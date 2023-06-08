const express = require("express");
var bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
const clients = require('../models/clientschema');
const {check,validationResult}=require('express-validator');

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

    router.post('/checkem',User.chechem)
    router.post('/login', User.validatepass,User.logs);
   // router.post('/checkem',User.chechem)
   router.post('/checkemlogin',User.chechemlogin)

   router.post('/edit',User.edituser)

   router.post('/signup',User.validate,User.AddUser)


    router.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

 module.exports = router;
