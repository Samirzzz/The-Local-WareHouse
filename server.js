var http =require('http');
var fs=require('fs')
const express=require('express');
const session=require('express-session');
 const app=express();
 const crypt = require("bcrypt");
 const client=require('./models/clientschema');
//  var db=mongoose.connection;
app.use(session({secret:"Your_Secret_Key"}))
app.set('view engine','ejs');
app.use(express.static('public/css'))
app.use(express.static('public/images'))
app.use(express.static('public/js'))
app.use(express.urlencoded({ extended: true }));


var index_router = require("./routes/index.js");
var login_router = require("./routes/login.js");
var signup_router = require("./routes/signup.js");
var admin_router = require("./routes/admin.js");
var product_router = require("./routes/product.js");
var edit_router = require("./routes/Account.js");
var forget_router = require("./routes/forget.js");
var wishlist_router=require("./routes/wishlist.js");

const port = 3000

const mongoose = require('mongoose');

// app.listen(port, () => {
//     console.log(`Server is up and  listening on port http://localhost:${port}`)
//   });

app.get('/shirtshtml', (req, res) => {
    res.render('shirtshtml', { user: (req.session.user === undefined ? "" : req.session.user) });
})

app.get('/product-details', (req, res) => {
    res.render('product-details', { user: (req.session.user === undefined ? "" : req.session.user) });
})

app.post("/signup", (req, res) => {
   
     
    var query = { "Email": req.body.Email };

    client.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('email taken');

            }
            else {
                var salt=crypt.genSaltSync(10);
                const pass_hash = crypt.hashSync(req.body.password, salt);
                crypt.hashSync(req.body.password, salt, function(err, pass_hash) {
                    const emp = new client({
                        username: req.body.username,
                        Email: req.body.Email,
                        password: pass_hash,
                        Type: req.body.type,
                        phonee: req.body.phonee,
                        birth: req.body.date,
                        gender: req.body.gender
    
                    })
                    
                    emp.save();
                });
                console.log(req.body.password);
                    console.log(pass_hash);
                res.redirect('/');
               
            }

        });
});



app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// mongoose.connect("mongodb+srv://SBF:SBF30@project2.zbssjs4.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(result => app.listen(3000))
//     .catch(err => console.log(err));
app.post('/login',  (req, res)=> {
    var user={"Email":req.body.email};
    
    client.findOne(user).then(result=>{
        var salt=crypt.genSaltSync(10);
        const hash=crypt.hashSync(req.body.password,salt)
        console.log(req.body.password);
        console.log(hash);
        console.log(result.password);
        
        if(result==null){
            res.send('email does not exist');
            
        }
        const valid=crypt.compareSync(result.password,hash);
           if(valid==true){
   
               res.send('true');
           }
           else{
               res.send('false');
          
       } 
    
        
       
    })
    .catch(err => {
    console.log(err);
  });
});

	//console.log(req.body);

//     var query={"Email":req.body.email,"password":req.body.password};
    
//   client.find(query)
//   .then(result => {
    
//     if (result.length>0) {
//             res.send('found');
//             res.redirect('/');
//         }else{
//             res.send('error');
//         }
//   client.find(query)
//   .then(result => {
    
//     if (result.length>0) {
//             res.send('found');
//         }else{
//             res.send('error');
//         }
       


//   })
//   .catch(err => {
//     console.log(err);
//   });
 	

    
//setup routes
app.use('/', index_router);
app.use('/login',login_router);
app.use('/signup',signup_router);
app.use('/admin',admin_router);
app.use('/product',product_router);
app.use('/forget',forget_router);
app.use('/edit',edit_router);
app.use('/wishlist',wishlist_router);

mongoose.connect("mongodb+srv://SBF:SBF30@project2.zbssjs4.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>
    { app.listen(3000);
console.log(`server up and listening  on port http://localhost:${port}`)
}
)
.catch(err => console.log(err));
