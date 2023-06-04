const clients = require('../models/clientschema');
const Product = require('../models/productschema');
const Wishlist = require('../models/wishlist');
const Order = require('../models/orderschema');

const crypt = require("bcrypt");
const path = require('path');
const {check,validationResult}=require('express-validator');

const chechem = (req,res)=>{
    var query = { "Email": req.body.Email };
    clients.find(query)
      .then(result => {
          if (result.length > 0 ) {
              res.send('taken');
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
   
    clients.findOne(user).then(async result=>{
      
        req.session.user=result;
        const valid= await crypt.compare(req.body.password,result.password);
           if(valid==true){
               res.redirect('/');
           }
           else{
               res.send('false');
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
         
          list.items.push({productId:product.id,internalId:productId});
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

module.exports = {
    chechem,
    logs,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    validate,
    AddUser
    
};