const { Router } = require('express');
const forgetController = require("../controllers/forget");

var router = Router();

// router.use((req, res, next) => {
//     if (req.session.user !== undefined) {
//         next();
//     }
//     else {
//         res.render('err', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
//     }
// });

/* GET forget password page. */
router.get('/',(req,res)=>{
    res.render('forget');
}) 

router.post('/reset', async (req, res) =>
 {
    return await forgetController.generateResettokenEmail(req,res);
});

module.exports = router;