const clients = require('../models/clientschema');
const Product = require('../models/productschema');
const Wishlist = require('../models/wishlist');
const Order = require('../models/orderschema');
const UserPayments = require('../models/purchaseSchema');
const Stripe = require('stripe');
require('dotenv').config();
const stripe = new Stripe(process.env.StripeSecretKey);
const crypt = require("bcrypt");
const path = require('path');
const {check,validationResult}=require('express-validator');
const { request } = require('http');
const { CLIENT_RENEG_LIMIT } = require('tls');

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
  

  const logs = async function (req, res) {
    const user = { "Email": req.body.Email };
    const errors = validationResult(req);
    clients.findOne(user).then(async result => {
      if (!errors.isEmpty()) {
        const alert = errors.array();
        res.render('login', {
          alert
        });
      } else {
        const valid = await crypt.compare(req.body.password, result.password);
        if (valid) {
          req.session.user = result;
          res.redirect('/');
        } else {
          const alert = [{ msg: 'Wrong password' }]; // Create an alert for wrong password
          res.render('login', {
            alert
          });
        }
      }
    }).catch(err => {
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
         
          const exists = list.items.some(item => item.productId == product.id);
    
          if (exists) {
            res.json({ success: false, message: 'Product already exists in the Cart' });
            return;
          }
    
          list.items.push({productId:product.id,internalId:productId,amount:1});
          list.save();
          res.json({ success: true, message: 'Product added to Cart' });
      
      }  catch (error) {
        console.error('Error adding product to Cart:', error);
        res.status(500).json({ success: false, message: 'Error adding product to Cart' });
      }
    };
    

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
        // res.send(list);
        const products = await Product.find();
        const line_items=items.map(item=>{
          const product =products.find(p=>p.id==item.productId);
          return{

           quantity:item.amount,
           price_data: {
            currency: 'usd',
            product_data: {
              name: product?.name??"product name",
            },
            unit_amount: product?.price*100??0
          }
          }});
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: line_items,
          mode: 'payment',
          success_url: `https://thelocalwarehouse.store/cart/message?email=${user.Email}`,
          cancel_url: `http://localhost:3000/error/email=${user.Email}`,
        });
        console.log(session.url);

        res.send({url:session.url});
      } catch (error) {
        console.error('Error adding product to cart:', error);
        // throw error ;
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


const edituser=async(req,res)=>{
  const salt= await crypt.genSalt(10);
    const hash =await crypt.hash(req.body.password, salt);
    clients.findByIdAndUpdate(req.session.user._id, { password: hash,address:req.body.Address , phonee:req.body.phone ,Email:req.body.email  })
    .then( async result => {
            const salt= await crypt.genSalt(10);
            const hash =await crypt.hash(req.body.password, salt);
            result.password=hash;
          req.session.user.password =hash;
          req.session.user.address = req.body.Address;
          
       
console.log(req.session.user.password)
console.log(result.password)
console.log(req.body.password)

req.session.user=result;

        res.redirect('/')
    })
    .catch(err => {
        console.log(err);
    });
}
const search=async(req,res)=>{
  let payload = req.body.payload.trim();
  
  try {
    let searchResults = await product.find({
      name: { $regex: new RegExp('^' + payload + '.*', 'i') },
    }).exec();

    if (searchResults) {
      // Limit search results to 10
      searchResults = searchResults.slice(0,3);
      res.send({ payload: searchResults });
    } else {
      // Handle the case when searchResults is undefined
      res.send({ payload: [] });
    }
  } catch (error) {
    console.log('Error in search:', error);
    res.send({ payload: [] });
  }
  console.log(payload)

}


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
    prodpage,
    edituser
    
};