
const express = require("express");
var bodyParser = require('body-parser');
const clients = require('../models/clientschema');

const router = express.Router();
router.use(bodyParser.json());

const Admin1 = require("../controllers/Adminproductcontrol");
/* GET Admin page. */

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    }
    else {
        res.render('err', { err: 'You are not an Admin',user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


router.get('/',(req,res)=>{
    res.render('admin', { user: (req.session.user === undefined ? "" : req.session.user) });
}) 




/* GET Admin/adduser page. */
router.get('/adduser',(req,res)=>{
    res.render('adduser', { user: (req.session.user === undefined ? "" : req.session.user) });
    
})

/* GET Admin/searchedituser page. */
router.get('/searchedituser',(req,res)=>{
    res.render('searchedituser', { user: (req.session.user === undefined ? "" : req.session.user) });
}) 

/* GET Admin/edituser page. */
router.get('/edituser',(req,res)=>{
    res.render('edituser', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET Admin/searchbanuser page. */
router.get('/searchbanuser',(req,res)=>{
    res.render('searchbanuser', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET Admin/banuser page. */
router.get('/banuser',(req,res)=>{
    res.render('banuser', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET Admin/addproduct page. */

router.get('/addproduct',(req,res)=>{
    res.render('addproduct', { user: (req.session.user === undefined ? "" : req.session.user) });
})

router.post('/addproduct', Admin1.addprod);


/* GET Admin/searcheditproduct page. */
router.get('/searcheditproduct',(req,res)=>{
    res.render('searcheditproduct', { user: (req.session.user === undefined ? "" : req.session.user) });
})

/* GET Admin/editproduct page. */
router.get('/editproduct',(req,res)=>{
    res.render('editproduct', { user: (req.session.user === undefined ? "" : req.session.user) });
})
 
/* GET Admin/searchremoveprod page. */
router.get('/searchremoveprod',(req,res)=>{
    res.render('searchremoveprod', { user: (req.session.user === undefined ? "" : req.session.user) });
})
 
/* GET Admin/removeprod page. */
router.get('/removeprod',(req,res)=>{
    res.render('removeprod', { user: (req.session.user === undefined ? "" : req.session.user) });
})

router.get('/view&edituser',(req,res)=>{
    clients.find()
    .then(result => {
      res.render('view&edituser', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = router;