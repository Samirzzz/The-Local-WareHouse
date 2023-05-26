const product = require('../models/productschema');
const crypt = require("bcrypt");
const path = require('path');
const {check,validationResult}=require('express-validator');

const addprod= (req, res) => {
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
            image:  req.files.img.name,
        })
        prod.save()
        .then(result=>{
            res.redirect('/admin');
        })
        .catch(err=>{
            console.log(err);
        });

    });
};

module.exports = {
    addprod
};