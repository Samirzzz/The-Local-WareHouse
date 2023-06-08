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

router.post('/search', async (req, res) => {
  let payload = req.body.payload.trim();

  try {
    let searchResults = await product.find({
      name: { $regex: new RegExp('^' + payload + '.*', 'i') },
    }).exec();

    if (searchResults) {
      // Limit search results to 10
      searchResults = searchResults.slice(0, 3);
      res.send({ payload: searchResults });
    } else {
      // Handle the case when searchResults is undefined
      res.send({ payload: [] });
    }
  } catch (error) {
    console.log('Error in search:', error);
    res.send({ payload: [] });
  }
});

module.exports = router;
