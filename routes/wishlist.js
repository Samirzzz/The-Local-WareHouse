const express = require('express');
const { Router } = express;

const product = require('../models/productschema');
const Wishlist = require('../models/wishlist')

const router = Router();
const user = require("../controllers/usercontrol");
router.use(express.json());

router.use((req, res, next) => {
  if (req.session.user.Type === "client") {
      next();
  }
  else {
      res.render('err', { err: 'You must login as a user to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
  }
});



    /* GET wishlist page. */
    router.get('/', function(req, res, next) {
        Wishlist.findOne({ email: req.session.user.Email })
          .then(result => {
            product.find().then(products => {
              const mod = result?.items?.map(item => products.find(p => p.id == item.productId)).filter(item => !!item);
              res.render('wishlist', { wishlist: mod ?? [], user: (req.session.user === undefined ? "" : req.session.user) });
            });
          })
          .catch(err => {
            console.log(err);
            // Handle the error appropriately
          });
      });


    router.post('/:productId', user.addToWishlist);
    router.delete('/:productId', user.removeFromWishlist);

module.exports = router;