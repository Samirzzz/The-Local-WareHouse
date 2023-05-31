const { Router } = require('express');
var bodyParser = require('body-parser');
var router = Router();
router.use(bodyParser.json());

const product = require('../models/productschema');

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


module.exports = router;
