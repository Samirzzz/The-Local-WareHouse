const { Router } = require('express');

var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) });
    });

module.exports = router;
