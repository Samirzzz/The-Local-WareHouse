const clients = require('../models/clientschema');
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
};