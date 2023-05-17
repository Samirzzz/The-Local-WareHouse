var http = require('http');
var fs = require('fs')
const express = require('express');
const session = require('express-session');
const app = express();
const crypt = require("bcryptjs");
const client = require('./models/clientschema');
//  var db=mongoose.connection;
app.use(session({ secret: "Your_Secret_Key" }))
app.set('view engine', 'ejs');
app.use(express.static('public/css'))
app.use(express.static('public/images'))
app.use(express.static('public/js'))
app.use(express.urlencoded({ extended: true }));


const port = 3000

const mongoose = require('mongoose');



app.get('/', (req, res) => {
    res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) });

})
app.get('/edit', (req, res) => {
    res.render('edit', { user: (req.session.user === undefined ? "" : req.session.user) });
})
app.get('/Wishlist', (req, res) => {
    res.render('Wishlist', { user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/login', (req, res) => {

    res.render('login', { user: (req.session.user === undefined ? "" : req.session.user) });

})

app.get('/product', (req, res) => {
    res.render('product', { user: (req.session.user === undefined ? "" : req.session.user) });
})
app.get('/jeanshtml', (req, res) => {
    res.render('jeanshtml', { user: (req.session.user === undefined ? "" : req.session.user) });
})
app.get('/forget', (req, res) => {
    res.render('forget');
})
app.get('/signup', (req, res) => {
    res.render('signup', { user: (req.session.user === undefined ? "" : req.session.user) });
})
app.get('/admin', (req, res) => {
    res.render('admin', { user: (req.session.user === undefined ? "" : req.session.user) });
})
app.get('/admin/adduser', (req, res) => {
    res.render('adduser');
})
app.get('/admin/searchedituser', (req, res) => {
    res.render('searchedituser');
})

app.get('/admin/edituser', (req, res) => {
    res.render('edituser');
})
app.get('/admin/searchbanuser', (req, res) => {
    res.render('searchbanuser');
})
app.get('/admin/banuser', (req, res) => {
    res.render('banuser');
})
app.get('/admin/addproduct', (req, res) => {
    res.render('addproduct');
})
app.get('/admin/searcheditproduct', (req, res) => {
    res.render('searcheditproduct');
})
app.get('/admin/editproduct', (req, res) => {
    res.render('editproduct');
})
app.get('/admin/searchremoveprod', (req, res) => {
    res.render('searchremoveprod');
})
app.get('/admin/removeprod', (req, res) => {
    res.render('removeprod');
})
app.get('/admin/addbrand', (req, res) => {
    res.render('addbrand');
})
app.get('/admin/searcheditbrand', (req, res) => {
    res.render('searcheditbrand');
})

app.get('/admin/editbrand', (req, res) => {
    res.render('editbrand');
})
app.get('/admin/searchremovebrand', (req, res) => {
    res.render('searchremovebrand');
})
app.get('/admin/removebrand', (req, res) => {
    res.render('removebrand');
})


app.get('/shirtshtml', (req, res) => {
    res.render('shirtshtml', { user: (req.session.user === undefined ? "" : req.session.user) });
})

app.get('/product-details', (req, res) => {
    res.render('product-details', { user: (req.session.user === undefined ? "" : req.session.user) });
})

app.post("/signup", (req, res) => {
    // req.body.password = crypt.hashSync(req.body.password, 10)



    var query = { "Email": req.body.Email };

    client.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('email taken');

            }
            else {

                const emp = new client({
                    username: req.body.username,
                    Email: req.body.Email,
                    password: req.body.password,
                    Type: req.body.type,
                    phonee: req.body.phonee,
                    birth: req.body.date,
                    gender: req.body.gender

                })

                emp.save();
                res.redirect('/');
            }

        });
});



app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

mongoose.connect("mongodb+srv://SBF:SBF30@project2.zbssjs4.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));
