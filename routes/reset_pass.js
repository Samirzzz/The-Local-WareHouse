const { Router } = require('express');
const resetcont=require("../controllers/reset_pass_cont")
var router = Router();


// reset_password
router.get('/',async (req,res) => {
    return res.render('set_new_pass');
});

 // post -> /set_new_password
router.post('/save',async (req,res) =>
 {
    if(await resetcont.save_new_password(req,res) == 1)
    res.render("pass_saved_sucess");
    else
    console.log("error"); 
 }) 


module.exports = router;
