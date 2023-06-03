const product = require('../models/productschema');
const fs = require('fs');
 const path = require('path');


const addprod= (req, res) => {
    let imgfile;
    let uploadPath;
    // console.log(req)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded.');
    }
    imgfile = req.files.img;
    uploadPath = './public/images/' + req.files.img.name;

    imgfile.mv(uploadPath, function (err) {
        if (err)
        return res.status(500).send(err);
        const prod = new product({
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            Quantity: req.body.quan,
            image:  req.files.img.name,
        })
        prod.save()
        .then(result=>{
            res.redirect('/admin/view&editprod');
        })
        .catch(err=>{
            console.log(err);
        });

    });
};
const GetAllprod = (req, res) => {
    product.find()
      .then(result => {
        res.render('view&editprod', { product: result, user: (req.session.user === undefined ? "" : req.session.user) });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const Deleteprod = (req, res) => {
    product.findByIdAndDelete(req.params.id)
      .then(result => {
        fs.unlink(path.join(__dirname, '../public/images/' + req.params.img), (err) => {
          if (err) {
            throw err;
          }
          res.redirect('/admin/view&editprod');
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
const editprod=(req,res)=>{
    var query = { "_id": req.params.id };
    product.findById(query)
      .then(result => {
        res.render('editprod', { editprod: result , user: (req.session.user === undefined ? "" : req.session.user) });
      })
      .catch(err => {
        console.log(err);
      });
    };

    const editing= (req, res) => {
        product.findByIdAndUpdate(req.params.id, { name:req.body.name , price:req.body.price, Quantity:req.body.quan  })
            .then(result => {
                res.redirect('/admin/view&editprod')
            })
            .catch(err => {
                console.log(err);
            });
      };

module.exports = {
    addprod,
    GetAllprod,
    Deleteprod,
    editprod,
    editing
};