
const express = require("express");
var bodyParser = require('body-parser');
const clients = require('../models/clientschema');

const router = express.Router();
router.use(bodyParser.json());

const Admin1 = require("../controllers/Adminproductcontrol");
const Admin2 = require("../controllers/Adminusercontrol");
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
router.get('/view&edituser', Admin2.GetAllUsers);
router.get("/toAdmin/:id", Admin2.toAdmin);
router.get("/toClient/:id", Admin2.toClient);
router.get("/delete/:id", Admin2.DeleteUser);



/* GET Admin/addproduct page. */

router.get('/addproduct',(req,res)=>{
    res.render('addproduct', { user: (req.session.user === undefined ? "" : req.session.user) });
})



router.post('/addproduct', Admin1.addprod);
router.get('/view&editprod', Admin1.GetAllprod);
router.get('/delete/:img/:id', Admin1.Deleteprod);

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



module.exports = router;