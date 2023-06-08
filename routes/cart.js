const bodyParser = require('body-parser');
const express = require('express');
const { Router } = express;
const router = Router();
require("dotenv").config();
const Stripe = require('stripe');
 StripePublishableKey="pk_test_51NGRj4C0y9Z2PZln6aZHDyNDxjEi9kKeZY57q8KKA3BhJ7dNmPPC5xkS7WmxXICHl1OPMpeaepQ8OEpb9yOWYsI000bkPnqsPl"
const StripeSecretKey="sk_test_51NGRj4C0y9Z2PZlnB3umXOLHm3ZU3DvsMZ0IZ2MGpl0UU4P1WqQx1eFr20KQ4qyDb7LeBXTwckkKr72vPGZFcNDl00EyZARZCO"
const stripe = new Stripe(StripeSecretKey);
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

  router.get('/message', function(req, res, next) {
    res.render('message', { user: (req.session.user === undefined ? "" : req.session.user) });
});


module.exports = router;