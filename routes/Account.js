const { Router } = require('express');

var router = Router();

router.use((req, res, next) => {
    if (req.session.user !== undefined) {
        next();
    }
    else {
        res.render('err', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

/* GET Account Detail page. */
router.get('/', function(req, res, next) {
        res.render('edit', { user: (req.session.user === undefined ? "" : req.session.user) });
    
    });

module.exports = router;
