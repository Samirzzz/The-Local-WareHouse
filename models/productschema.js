const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema= new Schema({

    id:{
        type:Number,
    },

    name:{
        type:String,
        trim:true,  
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    type:{
        type:String,
        required:true
    },

    Quantity:{
        type:Number
    },
    Description:{
     type:String
    },
    image:{
        type:String,
        trim:true,
        required:true
    },
},{timestamps:true});

const product = mongoose.model('product', productSchema);
module.exports=product;
