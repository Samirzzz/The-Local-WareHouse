const clients = require('../models/clientschema');
const Product = require('../models/productschema');
const Wishlist = require('../models/wishlist');
const Order = require('../models/orderschema');
const UserPayments = require('../models/purchaseSchema');

const crypt = require("bcrypt");
const path = require('path');
const {check,validationResult}=require('express-validator');
const { request } = require('http');

const chechem = (req,res)=>{
    var query = { "Email": req.body.Email };
    clients.find(query)
      .then(result => {
        if (!result) {
              
            res.send('not found');
          }
            else {
                res.send('available');
            }
        });



}
const chechemlogin = (req,res)=>{
    const user = { "Email": req.body.Email };
    clients.findOne(user).then(async result=>{
        if(!result){
            res.send('not found');
         
      }
            else {
                res.send('available');
            }
        });
}
const validate=
    [check('username').isLength({min:4}).withMessage('min 4 characters'),
    //     check('username,Email,password,phonee,address,gender')
    // .notEmpty()
    // .withMessage('field is required'),
   
    
    check('Email')
    .isEmail()
    .withMessage('Invalid email address'),
    
    check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
    
    check('phonee')
  
    .isMobilePhone()
    .withMessage('Invalid phone number'),
    
    check('address')
    
    .isLength({ max: 100 })
    .withMessage('Address cannot be longer than 100 characters'),
    
    check('gender')
    .optional({ nullable: true })
    .isIn(['male', 'female', 'other'])
    .withMessage('choose gender"')]

    const validatepass=
    [
    //     check('username,Email,password,phonee,address,gender')
    // .notEmpty()
    // .withMessage('field is required'),
   
    
    check('Email')
    .isEmail()
    .withMessage('Invalid email address'),
    
    check('password')
    .isLength({ min: 1 })
    .withMessage('enter password'),]
    
  

const AddUser = (req, res) => {
    const errors = validationResult(req);
    var query = { "Email": req.body.Email };
    clients.find(query)
      .then(result => {
          if (result.length > 0 ) {
              
              res.send('taken');
            }else if(!errors.isEmpty()){
           const alert=errors.array();
          res.render('signup',{
           alert
          })
        }
        
        else {
          const emp = new clients({
            username: req.body.username,
            Email: req.body.Email,
            password: req.body.password,
            Type: req.body.type,
            phonee: req.body.phonee,
            address: req.body.address,
            gender: req.body.gender
          })
          emp.save();
          req.session.user=result;
  
          console.log(req.body.password);
          res.redirect('/');
        }
      });


    
  }

const logs = async function  (req, res) {
    const user = { "Email": req.body.Email };
    const errors = validationResult(req);
    clients.findOne(user).then(async result=>{
        if(!errors.isEmpty()){
         const alert=errors.array();
        res.render('login',{
         alert
        })
      }
      req.session.user=result;
      const valid= await crypt.compare(req.body.password,result.password);
      if(valid==true){
          res.redirect('/');
      }
      else{
        res.send('incorrect');
} 
      
    })
        .catch(err => {
            console.log(err);
        });
};

    // Function to add a product to the wishlist
    const addToWishlist = async function (req, res) {
      const productId = req.params.productId;
      const email = req.session.user.Email;
    
      try {
        // Fetch the product details from the database
        const product = await Product.findById(productId);
    
        if (!product) {
          throw new Error('Product not found');
        }
    
        // Check if the product already exists in the wishlist
        const user = { email: email };
        let list = await Wishlist.findOne(user);
    
        if (!list) {
          list = await Wishlist.create({ items: [], email: email });
        }
    
        // Check if the product already exists in the wishlist items
        const exists = list.items.some(item => item.productId == product.id);
    
        if (exists) {
          res.json({ success: false, message: 'Product already exists in the wishlist' });
          return;
        }
    
        list.items.push({ productId: product.id, internalId: productId });
        list.save();
        res.json({ success: true, message: 'Product added to wishlist' });
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ success: false, message: 'Error adding product to wishlist' });
      }
    };
    

      const removeFromWishlist = async function (req, res) {
        const productId = req.params.productId;
        const email = req.session.user.Email;
        try {
          const user = { email: email };
          // Find the order document for the user
          const wishlist = await Wishlist.findOne(user);
      
          if (!wishlist) {
            throw new Error('Wishlist not found');
          }
          // Find the index of the item to remove
          const index = wishlist.items.findIndex(item => item.productId == productId);
      
          if (index === -1) {
            throw new Error('Product not found in wishlist');
          }
      
          // Remove the item from the order array
          wishlist.items.splice(index, 1);
      
          // Save the updated wishlist
          await wishlist.save();
      
          res.send(wishlist);
        } catch (error) {
          console.error('Error removing product from wishlist:', error);
          res.sendStatus(500);}
};
    
const addToCart= async function(req,res) {
  const productId=req.params.productId;
  const email=req.session.user.Email;

      try {
        // Fetch the product details from the database
        const product = await Product.findById(productId);
    
        if (!product) {
          throw new Error('Product not found');
        }
    
        // Create a new wishlist entry with the fetched product details
        const user = { "email":email };
 
          let list=await Order.findOne(user);
          if(!list){
              list=await Order.create({items:[],email:email})
          }
         
          list.items.push({productId:product.id,internalId:productId,amount:1});
          list.save();
          res.send(list);
      
      } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error ;
      }
    }

    const removeFromCart = async function (req, res) {
      const productId = req.params.productId;
      const email = req.session.user.Email;
      try {
        const user = { email: email };
        // Find the order document for the user
        const order = await Order.findOne(user);
    
        if (!order) {
          throw new Error('CART not found');
        }
        console.log("A");
        // Find the index of the item to remove
        const index = order.items.findIndex(item => item.productId == productId);
    
        if (index === -1) {
          throw new Error('Product not found in cart');
        }
        console.log("B");

        // Remove the item from the order array
        order.items.splice(index, 1);
    
        // Save the updated order
        await order.save();
    
        res.send(order);
      } catch (error) {
        console.error('Error removing product from cart njnj:', error);
        res.sendStatus(500);}
};

const editCart = async function (req, res) {
  const productId = req.params.productId;
  const email = req.session.user.Email;
  try {
    const user = { email: email };
    // Find the order document for the user
    const order = await Order.findOne(user);

    if (!order) {
      throw new Error('CART not found');
    }
    // Find the index of the item to remove
    const index = order.items.findIndex(item => item.productId == productId);

    if (index === -1) {
      throw new Error('Product not found in cart');
    }
    // Remove the item from the order array
    order.items[index].amount=req.body.amount??0;
    // Save the updated order
    await order.save();

    res.send(order);
  } catch (error) {
    console.error('Error removing product from cart njnj:', error);
    res.sendStatus(500);}
};

const buyOrder= async function(req,res) {
  const email=req.session.user.Email;
      try {      
        const user = { "email":email };

          let list=await Order.findOne(user);
          if(!list || list.items.length==0){
            throw new Error("Your Cart is Empty!");
          }

         let userPayments=await UserPayments.findOne(user);
         if(!userPayments){
         userPayments=await UserPayments.create({orders:[],email:email})
        }
        const items=list.items.map(item=>{return{amount:item.amount,productId:item.productId,internalId:item.internalId}});
        console.log(items);
        userPayments.orders.push({items:items});
        
        userPayments.save();
        list.items=[];
        list.save();
        res.send(list);

      } catch (error) {
        // console.error('Error adding product to cart:', error);
        throw error ;
      }
    }

    const prodpage=(req,res)=>{
      var query = { "_id": req.params.id };
      Product.findById(query)
        .then(result => {
          res.render('product-details', { prod: result , user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch(err => {
          console.log(err);
        });
      };





module.exports = {
    chechem,
    logs,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    validate,
    editCart,
    AddUser,
    validatepass,
    chechemlogin,
    buyOrder,
    prodpage
    
};