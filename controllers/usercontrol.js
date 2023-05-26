const clients = require('../models/clientschema');
const crypt = require("bcrypt");
const path = require('path');
const {check,validationResult}=require('express-validator');

const AddUser = (req, res) => {
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
    
}



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

module.exports = {
    AddUser,
    logs,
};