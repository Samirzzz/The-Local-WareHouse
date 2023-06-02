const { Router } = require('express');
var bodyParser = require('body-parser');

var router = Router();
const user = require("../controllers/usercontrol");
router.use(bodyParser.json());

router.use((req, res, next) => {
    if (req.session.user !== undefined) {
        next();
    }
    else {
        res.render('err', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


///wishlist

    /* GET wishlist page. */
    router.get('/', function(req, res, next) {
            res.render('wishlist', { user: (req.session.user === undefined ? "" : req.session.user) });
        });


    router.post('/:productId', user.addToWishlist);
    router.delete('/:productId', user.removeFromWishlist);

module.exports = router;