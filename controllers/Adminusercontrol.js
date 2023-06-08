const clients = require('../models/clientschema');
const UserPayments = require('../models/purchaseSchema');

const express = require('express');
const app = express();

const GetAllUsers = (req, res) => {
 
 
  clients.find()
      .then(result => {
        res.render('view&edituser', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const GetAllUsersdash = (req, res) => {
    var order=UserPayments.find;
    clients.find()
      .then(result => {
        res.render('admin', { employees: result, ord: order, user: (req.session.user === undefined ? "" : req.session.user) });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const AddUseradmin = (req, res) => {
  
          
          const emp = new clients({
            username: req.body.username,
            Email: req.body.Email,
            password: req.body.password,
            Type: req.body.type,
            phonee: req.body.phone,
            address: req.body.address,
            gender: req.body.gender
          })
          emp.save()
          .then(result => {
            res.redirect('/admin/view&edituser');
        })
        .catch(err => {
            console.log(err);
        });
  }
  
    
  

  const toAdmin = (req, res) => {
    clients.findByIdAndUpdate(req.params.id, { Type: 'admin' })
        .then(result => {
            res.redirect('/admin/view&edituser')
        })
        .catch(err => {
            console.log(err);
        });
  };

  const toClient = (req, res) => {
    clients.findByIdAndUpdate(req.params.id, { Type: 'client' })
        .then(result => {
            res.redirect('/admin/view&edituser')
        })
        .catch(err => {
            console.log(err);
        });
  };
  const edituser=(req,res)=>{
    var query = { "_id": req.params.id };
    clients.findById(query)
      .then(result => {
        res.render('edituseradmin', { edituser: result , user: (req.session.user === undefined ? "" : req.session.user) });
      })
      .catch(err => {
        console.log(err);
      });
    };
    const editing= (req, res) => {
      clients.findByIdAndUpdate(req.params.id, { username:req.body.username , phonee:req.body.phone, address:req.body.address  })
          .then(result => {
              res.redirect('/admin/view&edituser')
          })
          .catch(err => {
              console.log(err);
          });
    };

  const DeleteUser = (req, res) => {
    clients.findByIdAndDelete(req.params.id)
      .then(result => {
       
          res.redirect('/admin/view&edituser');
        })
      .catch(err => {
        console.log(err);
      });
  };
  


  module.exports = {
    GetAllUsers,
    toAdmin,
    toClient,
    DeleteUser,
    AddUseradmin,
    edituser,
    editing,
    GetAllUsersdash
};