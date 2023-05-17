const { Router } = require('express');
var router = Router();

/* GET Admin page. */
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
router.get('/addproduct',(req,res)=>{
    res.render('addproduct');
})

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

/* GET Admin/addbrand page. */
router.get('/addbrand',(req,res)=>{
    res.render('addbrand');
})

/* GET Admin/searcheditbrand page. */
router.get('/searcheditbrand',(req,res)=>{
    res.render('searcheditbrand');
})


/* GET Admin/editbrand page. */
router.get('/editbrand',(req,res)=>{
    res.render('editbrand');
}) 

/* GET Admin/searchremovebrand page. */
router.get('/searchremovebrand',(req,res)=>{
    res.render('searchremovebrand');
})

/* GET Admin/removebrand page. */
router.get('/removebrand',(req,res)=>{
    res.render('removebrand');
}) 

module.exports = router;