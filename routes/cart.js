const bodyParser = require('body-parser');
const express = require('express');
const { Router } = express;
const router = Router();
require("dotenv").config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.StripeSecretKey);

const Order = require('../models/orderschema');
const product = require('../models/productschema');
const user1 = require("../controllers/usercontrol");

router.use(express.json());

router.use((req, res, next) => {
  if (req.session.user.Type === "client") {
      next();
  }
  else {
      res.render('err', { err: 'You must login as a user to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
  }
});


  /* GET Cart page. */
  router.get('/', function(req, res, next) {
    if (req.session.user && req.session.user.Email) {
      Order.findOne({ email: req.session.user.Email })
        .then(result => {
          product.find().then(products => {
            const mod = result?.items?.map(item => {
              const p= products.find(p => p.id == item.productId);
             if(p) p.amount=item.amount;
              return p;
            }).filter(item => !!item);
            var total=mod.reduce((t,item)=>t+item.price*item.amount,0);
            res.render('cart', { total:total,order: mod ?? [], user: (req.session.user === undefined ? "" : req.session.user) });
          });
        })
        .catch(err => {
          console.log(err);
          // Handle the error appropriately
        });
    }
  });

  router.post('/buyOrder', user1.buyOrder);
  router.post('/:productId', user1.addToCart);
  router.delete('/:productId', user1.removeFromCart);
  router.put('/:productId', user1.editCart);
  // router.post('/checkout', user1.create_checkout_session);

  router.get('/message', function(req, res, next) {
    res.render('message', { user: (req.session.user === undefined ? "" : req.session.user) });
});


module.exports = router;