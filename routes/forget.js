const { Router } = require('express');
const forgetController = require("../controllers/forget");

var router = Router();

/* GET forget password page. */
router.get('/',(req,res)=>{
    res.render('forget');
}) 

router.post('/reset', async (req, res) =>
 {
    return await forgetController.generateResetPasswordEmail(req,res);
});

module.exports = router;



