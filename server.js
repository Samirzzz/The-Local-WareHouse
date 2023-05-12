
var http =require('http');
var fs=require('fs')
const express=require('express');
const session=require('express-session');
 const app=express();
 app.use(session({secret:"Your_Secret_Key"}))
app.set('view engine','ejs');
app.use(express.static('public/css'))
app.use(express.static('public/images'))
app.use(express.static('public/js'))


const port =3000

app.get('/',(req,res)=>{
    res.render('index');

})
app.get('/edit',(req,res)=>{
    res.render('edit');
})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/product',(req,res)=>{
    res.render('product');
}) 
app.get('/jeanshtml',(req,res)=>{
    res.render('jeanshtml');
}) 
app.get('/forget',(req,res)=>{
    res.render('forget');
}) 
app.get('/signup',(req,res)=>{
    res.render('signup');
}) 
app.get('/admin',(req,res)=>{
    res.render('admin');
}) 
app.get('/admin/adduser',(req,res)=>{
    res.render('adduser');
}) 
app.get('/admin/edituser',(req,res)=>{
    res.render('edituser');
}) 
app.get('/admin/banuser',(req,res)=>{
    res.render('banuser');
}) 

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  });
