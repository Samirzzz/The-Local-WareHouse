
var http =require('http');
var fs=require('fs')
const express=require('express');
const session=require('express-session');
 const app=express();
 const mongoose = require('mongoose');
 const crypt = require("bcryptjs");
 const Sign=require('./models/clientschema');
//  var db=mongoose.connection;
 app.use(session({secret:"Your_Secret_Key"}))
app.set('view engine','ejs');
app.use(express.static('public/css'))
app.use(express.static('public/images'))
app.use(express.static('public/js'))
app.use(express.urlencoded({extended:true}));

const port =3000

 


app.get('/',(req,res)=>{
    res.render('index');

})
// app.post('/',(req,res)=>{
//     res.render('index');

// })
app.get('/edit',(req,res)=>{
    res.render('edit');
})
app.get('/Wishlist',(req,res)=>{
    res.render('Wishlist')
})
app.get('/login',(req,res)=>{
    
    res.render('login');




})
// app.post('/login',async(req,res) => { 
//     try {
//         const check=await collection
//     } catch (error) {
        
//     }
//  })
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
app.get('/admin/searchedituser',(req,res)=>{
    res.render('searchedituser');
}) 

app.get('/admin/edituser',(req,res)=>{
    res.render('edituser');
}) 
app.get('/admin/searchbanuser',(req,res)=>{
    res.render('searchbanuser');
}) 
app.get('/admin/banuser',(req,res)=>{
    res.render('banuser');
}) 
app.get('/admin/addproduct',(req,res)=>{
    res.render('addproduct');
}) 
app.get('/admin/searcheditproduct',(req,res)=>{
    res.render('searcheditproduct');
}) 
app.get('/admin/editproduct',(req,res)=>{
    res.render('editproduct');
}) 
app.get('/admin/searchremoveprod',(req,res)=>{
    res.render('searchremoveprod');
}) 
app.get('/admin/removeprod',(req,res)=>{
    res.render('removeprod');
}) 
app.get('/admin/addbrand',(req,res)=>{
    res.render('addbrand');
}) 
app.get('/admin/searcheditbrand',(req,res)=>{
    res.render('searcheditbrand');
}) 

app.get('/admin/editbrand',(req,res)=>{
    res.render('editbrand');
}) 
app.get('/admin/searchremovebrand',(req,res)=>{
    res.render('searchremovebrand');
}) 
app.get('/admin/removebrand',(req,res)=>{
    res.render('removebrand');
}) 
app.get('/wishlist',(req,res)=>{
    res.render('wishlist');
})
app.get('/edit',(req,res)=>{
    res.render('edit');
})
app.post("/signup", (req, res) => {
    req.body.password=crypt.hashSync(req.body.password,10)
    
   
      
      var query={"Email":req.body.Email};
      
      Sign.find(query)
        .then(result => {
            if(result.length>0){
                res.send('email taken');

            }
    else{
                
      const emp = new Sign({
        username: req.body.username,
        Email:req.body.Email,
        password: req.body.password,
        phonee:req.body.phonee,
        birth:req.body.birth,
        gender:req.body.gender

       })
      
          emp.save();
          res.redirect('/');
    }

    });
});

  //  }

    //         const emp = new Sign({
    //                         username,
    //                         Email,
    //                         password,
    //                         phonee,
    //                         birth,
    //                         gender
    //                       });
    // emp
    // .save()
    // .then( result => {
    //   res.redirect("/");
    // })



    // try {
    //     const { username, Email, password,phonee,birth,gender } = req.body;

    //   const checkEmail =await  Sign.findOne({ Email }); //if found return the object if not return null
    //   const checkUsername = await Sign.findOne({ username }); //if found return the object if not return null
    //   if (checkEmail) {
    //     res.send({ msg: "Email is Taken" });
    //   } else if (checkUsername) {
    //     res.send({ msg: "Username is Taken" });
    //   } else {
    //    const s =  crypt.genSalt();
    //     const hashedPassword =  crypt.hashSync(password, s);
    //          req.body.password=hashedPassword;
    //          const newStudent = new studentModel({
    //             username,
    //             Email,
    //             password: hashedPassword,
    //             phonee,
    //             birth,
    //             gender
    //           });
      
    //        newStudent.save();
    
      
    
    
    //     res.send({ msg: "Student added" });
    //   }
    // } catch (err) {
    //   res.json({ msg: "ERROR" });
    //}
//     var name = req.body.username;
//     var email =req.body.Email;
//     var password = req.body.password;
//     var phone =req.body.phone;
//     var birth =req.body.birth;
//     var gender =req.body.gender;
//    const checkEmail =await  Sign.findOne({ email }); //if found return the object if not return null
//       const checkUsername = await Sign.findOne({ username }); //if found return the object if not return null
//       if (checkEmail) {
//         res.send({ msg: "Email is Taken" });
//       } else if (checkUsername) {
//         res.send({ msg: "Username is Taken" });
//       } else {
//        const s =  crypt.genSalt();
//         const hashedPassword =  crypt.hashSync(password, s);
//              req.body.password=hashedPassword;
//       }
//     const data = {
//         "name": name,
//         "Email":email,
//         "password":hashedPassword,
//         "phone":phone,
//         "birth":birth,
//         "gender":gender
//     }

//     data.save();
//     res.redirect('/');
//     res.send({ msg: "Student added" });
     

app.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await Sign.findOne({ Email: req.body.Email });
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;
          if (result) {
            res.render("/");
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});
// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`)
//   });
// mongoose.connect(, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then( result => {
//     app.listen(3000);
//    console.log(`Example app listening on port http://localhost:${port}`)
// })
//   .catch( err => {
//     console.log(err);
//   }); 
 
mongoose.connect("mongodb+srv://SBF:SBF30@project2.zbssjs4.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000))
.catch(err => console.log(err));
