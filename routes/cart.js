const bodyParser = require('body-parser');
const express = require('express');
const { Router } = express;
const router = Router();

const Order = require('../models/orderschema');
const product = require('../models/productschema');
const user1 = require("../controllers/usercontrol");

router.use(express.json());

router.use((req, res, next) => {
  if (req.session.user !== undefined) {
      next();
  }
  else {
      res.render('err', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
  }
});

  /* GET Cart page. */
  router.get('/', function(req, res, next) {
    if (req.session.user && req.session.user.Email) {
      Order.findOne({ email: req.session.user.Email })
        .then(result => {
          product.find().then(products => {
            const mod = result?.items?.map(item => products.find(p => p.id == item.productId)).filter(item => !!item);
            res.render('cart', { order: mod ?? [], user: (req.session.user === undefined ? "" : req.session.user) });
          });
        })
        .catch(err => {
          console.log(err);
          // Handle the error appropriately
        });
    }
  });
  


  router.post('/:productId', user1.addToCart);
  router.delete('/:productId', user1.removeFromCart);

module.exports = router;