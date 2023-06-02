const { Router } = require('express');
var bodyParser = require('body-parser');

var router = Router();
const user1 = require("../controllers/usercontrol");
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
          res.render('cart', { user: (req.session.user === undefined ? "" : req.session.user) });
      });


  router.post('/:productId', user1.addToCart);
  router.delete('/:productId', user1.removeFromCart);

module.exports = router;