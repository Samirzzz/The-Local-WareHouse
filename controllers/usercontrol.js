const clients = require('../models/clientschema');
const Product = require('../models/productschema');
const Wishlist = require('../models/wishlist');
const crypt = require("bcrypt");
const path = require('path');
const {check,validationResult}=require('express-validator');

const AddUser =[ check('username')
.notEmpty()
.withMessage('Username is required')
.isLength({ max: 50 })
.withMessage('Username cannot be longer than 50 characters'),

check('Email')
.notEmpty()
.withMessage('Email is required')
.isEmail()
.withMessage('Invalid email address'),

check('password')
.notEmpty()
.withMessage('Password is required')
.isLength({ min: 4 })
.withMessage('Password must be at least 6 characters long'),

check('phonee')
.notEmpty()
.withMessage('Phone number required')
.optional({ nullable: true })
.isMobilePhone()
.withMessage('Invalid phone number'),

check('address')
.notEmpty()
.withMessage('address required')
.optional({ nullable: true })
.isLength({ max: 100 })
.withMessage('Address cannot be longer than 100 characters'),

check('gender')
.notEmpty()
.withMessage('gender required')
.optional({ nullable: true })
.isIn(['male', 'female', 'other'])
.withMessage('Gender must be either "male", "female", or "other"') , (req, res) => {
   
  
    
    
    
    const errors = validationResult(req);
    var query = { "Email": req.body.Email };
    clients.find(query)
      .then(result => {
          if (result.length > 0 ) {
              
              console.log(errors)
              res.send('Email taken');
            }else if(!errors.isEmpty()){
            
            return res.send({errors:errors.array()})
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
    
  }]



const logs = async function  (req, res) {
    const user = { "Email": req.body.Email };
   
    clients.findOne(user).then(async result=>{
        if(result==null){
            res.send('taken');
        }
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
 const addToWishlist= async function (req,res) {
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
   
            let list=await Wishlist.findOne(user);
            if(!list){
                list=await Wishlist.create({items:[],email:email})
            }
           
            list.items.push({productId:product.id,internalId:productId});
            list.save();
            res.send(list);
        
        } catch (error) {
          console.error('Error adding product to wishlist:', error);
          throw error ;
        }
      }
    

module.exports = {
    AddUser,
    logs,
    addToWishlist,
};