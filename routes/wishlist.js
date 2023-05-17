const { Router } = require('express');

var router = Router();

/* GET wishlist page. */
router.get('/', function(req, res, next) {
        res.render('wishlist', { user: (req.session.user === undefined ? "" : req.session.user) });
    });

module.exports = router;
