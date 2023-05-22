var http = require('http');
var fs = require('fs')
const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();
const crypt = require("bcrypt");
const clients = require('./models/clientschema');
const product = require('./models/productschema')
 const {check,validationResult}=require('express-validator');

//  var db=mongoose.connection;
app.use(session({ secret: "Your_Secret_Key" }))
app.set('view engine', 'ejs');
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
var wishlist_router = require("./routes/wishlist.js");

const port = 3000

const mongoose = require('mongoose');

// app.listen(port, () => {
//     console.log(`Server is up and  listening on port http://localhost:${port}`)
//   });
// const query=async(Email,password)=>{
//     const user =await clients.findOne({"Email":Email});
//   const result= await user.comparepass(password)
// }
app.get('/shirtshtml', (req, res) => {
    res.render('shirtshtml', { user: (req.session.user === undefined ? "" : req.session.user) });
})

app.get('/product-details', (req, res) => {
    res.render('product-details', { user: (req.session.user === undefined ? "" : req.session.user) });
})

app.post("/signup", (req, res) => {


    var query = { "Email": req.body.Email };

    clients.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('email taken');

            }
            else {
                  const emp = new clients({
                        username: req.body.username,
                        Email: req.body.Email,
                        password: req.body.password,
                        Type: req.body.type,
                        phonee: req.body.phonee,
                        birth: req.body.date,
                        gender: req.body.gender
                })
                emp.save();
                console.log(req.body.password);
                res.redirect('/');
            }
        });
});

app.use(fileUpload());
app.post("/admin/addproduct", (req, res) => {
    let imgfile;
    let uploadPath;
    console.log(req)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded.');
    }
    imgfile = req.files.img;
    uploadPath = __dirname + '/public/images/' + req.files.img.name;

    imgfile.mv(uploadPath, function (err) {

        if (err)
        return res.status(500).send(err);

        const prod = new product({
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            Quantity: req.body.quan,
            image: uploadPath,
        })
        prod.save()
        .then(result=>{
            res.redirect('/admin');
        })
        .catch(err=>{
            console.log(err);
        });
    });
});





app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


app.post('/login',[check('Email').trim().isEmail().withMessage('enter valid email'),
check('password').trim().isLength(4).withMessage('min password length 4')] ,async function  (req, res) {
    const user = { "Email": req.body.Email };
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.send('error');
        errors.array(); 
    }
    clients.findOne(user).then(async result=>{
        
        
        if(result==null){
            res.send('email does not exist');

        }
        console.log(req.body.Email);
        console.log(req.body.password);
        console.log(result.Email);
        console.log(result.password);

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
});


// app.get('/banuser', (req, res) => {
//     clients.findByIdAndDelete(req.body.Email).then(result=>{

//     })
// });

// app.post('/edit',(req,res)=>{
//     const user = { "Email": req.body.Email };
//     clients.findOneAndUpdate(user).then(async result=>{
//         if(result==null){
//             res.send('email does not exist');

//         }
//     })
// })

//setup routes
app.use('/', index_router);
app.use('/login', login_router);
app.use('/signup', signup_router);
app.use('/admin', admin_router);
app.use('/product', product_router);
app.use('/forget', forget_router);
app.use('/edit', edit_router);
app.use('/wishlist', wishlist_router);

mongoose.connect("mongodb+srv://SBF2:SBF20@cluster0.ufxwb7t.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
        console.log(`server up and listening  on port http://localhost:${port}`)
    }
    )
    .catch(err => console.log(err));
app.use((req,res)=>{
    res.status(404).render('404', { user: (req.session.user === undefined ? "" : req.session.user) });

})