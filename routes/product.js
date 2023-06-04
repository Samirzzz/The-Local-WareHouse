const { Router } = require('express');
var bodyParser = require('body-parser');
var router = Router();
router.use(bodyParser.json());

const product = require('../models/productschema');
/////////

const getProducts= async (req, res, next) => {
    try {
        // We destructure the req.query object to get the page and limit variables from url 
        const { page = 1, limit = 5 } = req.query;

        const products = await Product.find({ ...req.query })
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(limit * 1)
            // I don't think i need to explain the math here
            .skip((page - 1) * limit)
            // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
            .sort({ createdAt: -1 })

        // Getting the numbers of products stored in database
        const count = await Product.countDocuments();

        return res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        next(err);
    }
};

// app.get('/product',(req,res)=>{
//     const page=req.body.p || 0
//     const productperpage=5
//     let productss=[];
    
//     product.collection('productss')
//     .find()
//     .sort({name:1})
//     .skip(page*productperpage)
//     .limit(productperpage)
//     .forEach(productss=>productss.push(productss))
//     .then(()=>{
//         res.status(200).json(productss)
//     })
//     .catch(()=>{
//         res.status(500).json({error:'could not fetch the documents'})
//     })
//     })

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


module.exports = router;
