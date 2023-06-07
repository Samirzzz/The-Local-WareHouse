const { Router } = require('express');
var bodyParser = require('body-parser');
var router = Router();
router.use(bodyParser.json());

const product = require('../models/productschema');
const productt = require("../controllers/usercontrol");



/////////
/* GET products page. */
router.get('/', (req, res) => {
    product.find()
    .then(result=>{
        res.render('product', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});
router.get('/Tshirts', (req, res) => {
    product.find()
    .then(result=>{
        res.render('Tshirts', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});
router.get('/Hoodies', (req, res) => {
    product.find()
    .then(result=>{
        res.render('Hoodies', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});
router.get('/Cargos', (req, res) => {
    product.find()
    .then(result=>{
        res.render('Cargos', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});

router.get('/product-details/:id', productt.prodpage)


module.exports = router;
