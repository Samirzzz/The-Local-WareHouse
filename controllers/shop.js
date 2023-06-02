const product=require('../routes/product');
const cart=require('../models/cart');

exports.getallproducts=(req,res,next)=>{
    const productschema=product.findAll();
    res.render('product',{ps:productschema});
};

exports.getproductdetail=(req,res,next)=>{
    const productschema=product.findById(req.params.prodid);
    res.render('product-details',{ps:productschema})
}

exports.addtocart=(req,res,next)=>{
    const addedproduct=product.findById(req.body.id)[0];
    //ana me3arafo fel product ejs bel name id

    cart.save(addedproduct);
    console.log(cart.getcart());
    res.end('saved')
}