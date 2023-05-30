const { Router } = require('express');
var bodyParser = require('body-parser');

var router = Router();
const user = require("../controllers/usercontrol");
router.use(bodyParser.json());
///wishlist

/* GET wishlist page. */
router.get('/', function(req, res, next) {
        res.render('wishlist', { user: (req.session.user === undefined ? "" : req.session.user) });
    });
    router.post('/:productId', user.addToWishlist);
    //  router.post('/:productId', user.addToWishlist);


module.exports = router;