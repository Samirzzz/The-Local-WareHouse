require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();
const crypt = require("bcrypt");
const clients = require('./models/clientschema');
const product = require('./models/productschema');


const {check,validationResult}=require('express-validator');
var bodyParser = require("body-parser");
app.use(session({ secret: "Your_Secret_Key" }))
app.set('view engine', 'ejs');


app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const index_router = require("./routes/index.js");
const signup_router = require("./routes/user.js");
const admin_router = require("./routes/admin.js");
const product_router = require("./routes/product.js");
const edit_router = require("./routes/Account.js");
const forget_router = require("./routes/forget.js");
const wishlist_router = require("./routes/wishlist.js");
const reset_pass=require("./routes/reset_pass");
const cart_router=require("./routes/cart");

const port = process.env.PORT;

const mongoose = require('mongoose');


app.use(fileUpload());

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/profile', (req, res) => {
  
    res.render('profile', { user: (req.session.user === undefined ? "" : req.session.user) });
});


app.post('/search', async (req, res) => {
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

//setup routes
app.use('/', index_router);
app.use('/user', signup_router);
app.use('/admin', admin_router);
app.use('/product', product_router);
app.use('/forget', forget_router);
app.use('/edit', edit_router);
app.use('/wishlist', wishlist_router);
app.use('/reset_password',reset_pass);
app.use('/cart',cart_router);

mongoose.connect("mongodb+srv://SBF2:SBF20@cluster0.ufxwb7t.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
        console.log(`server up and listening  on port http://localhost:${3000}`)
    }
    )
    .catch(err => console.log(err));
    
app.use((req,res)=>{
    res.status(404).render('404', { user: (req.session.user === undefined ? "" : req.session.user) });
})
