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

    router.post('/login', User.logs);
    router.post('/signup',[check('username').isLength({min:4}).withMessage('min 4 characters'),
    //     check('username,Email,password,phonee,address,gender')
    // .notEmpty()
    // .withMessage('field is required'),
   
    
    check('Email')
    .isEmail()
    .withMessage('Invalid email address'),
    
    check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
    
    check('phonee')
  
    .isMobilePhone()
    .withMessage('Invalid phone number'),
    
    check('address')
    
    .isLength({ max: 100 })
    .withMessage('Address cannot be longer than 100 characters'),
    
    check('gender')
    .optional({ nullable: true })
    .isIn(['male', 'female', 'other'])
    .withMessage('choose gender"')],(req,res)=>{
        const errors = validationResult(req);
        var query = { "Email": req.body.Email };
        clients.find(query)
          .then(result => {
              if (result.length > 0 ) {
                  
                  console.log(errors)
                  res.send('Email taken');
                }else if(!errors.isEmpty()){
               const alert=errors.array();
              res.render('signup',{
               alert
              })
            }
            
            else {
              const emp = new clients({
                username: req.body.username,
                Email: req.body.Email,
                password: req.body.password,
                Type: req.body.type,
                phonee: req.body.phonee,
                address: req.body.address,
                gender: req.body.gender
              })
              emp.save();
              req.session.user=result;
      
              console.log(req.body.password);
              res.redirect('/');
            }
          });




    } );



    router.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

 module.exports = router;
