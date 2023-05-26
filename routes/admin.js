
const express = require("express");
var bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const Admin1 = require("../controllers/productcontrol");
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
    res.render('adduser');
})

/* GET Admin/searchedituser page. */
router.get('/searchedituser',(req,res)=>{
    res.render('searchedituser');
}) 

/* GET Admin/edituser page. */
router.get('/edituser',(req,res)=>{
    res.render('edituser');
})

/* GET Admin/searchbanuser page. */
router.get('/searchbanuser',(req,res)=>{
    res.render('searchbanuser');
})

/* GET Admin/banuser page. */
router.get('/banuser',(req,res)=>{
    res.render('banuser');
})

/* GET Admin/addproduct page. */
router.post('/addproduct', Admin1.addprod);


router.get('/addproduct',(req,res)=>{
    res.render('addproduct');
})

router.post('/addproduct', Admin1.addprod);


/* GET Admin/searcheditproduct page. */
router.get('/searcheditproduct',(req,res)=>{
    res.render('searcheditproduct');
})

/* GET Admin/editproduct page. */
router.get('/editproduct',(req,res)=>{
    res.render('editproduct');
})
 
/* GET Admin/searchremoveprod page. */
router.get('/searchremoveprod',(req,res)=>{
    res.render('searchremoveprod');
})
 
/* GET Admin/removeprod page. */
router.get('/removeprod',(req,res)=>{
    res.render('removeprod');
})

module.exports = router;