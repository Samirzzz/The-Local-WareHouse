const { Router } = require('express');
const resetcont=require("../controllers/reset_pass_cont")
 var router = Router();


router.get('/',async (req,res)=>
{
    return await resetcont.setnew(req,res);
}) 
// post -> /set_new_password

module.exports = router;
