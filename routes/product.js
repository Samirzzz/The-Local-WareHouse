const { Router } = require('express');
const bodyParser = require('body-parser');
const router = Router();
router.use(bodyParser.json());

const product = require('../models/productschema');
const productt = require("../controllers/usercontrol");

/* GET products page. */
router.get('/', (req, res) => {
  product.find()
    .then(result => {
      res.render('product', { product: result, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/Tshirts', (req, res) => {
  product.find()
    .then(result => {
      res.render('Tshirts', { product: result, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/Hoodies', (req, res) => {
  product.find()
    .then(result => {
      res.render('Hoodies', { product: result, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/Cargos', (req, res) => {
  product.find()
    .then(result => {
      res.render('Cargos', { product: result, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/product-details/:id', productt.prodpage);


module.exports = router;
