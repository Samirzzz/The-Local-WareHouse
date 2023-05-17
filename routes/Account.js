const { Router } = require('express');

var router = Router();

/* GET Account Detail page. */
router.get('/', function(req, res, next) {
        res.render('edit', { user: (req.session.user === undefined ? "" : req.session.user) });
    
    });

module.exports = router;
