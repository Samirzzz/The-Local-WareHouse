import mongoose from "mongoose";

const productSchema= new mongoose.Schema({

    id:{
        type:Number,
    },

    name:{
        type:String,
        trim:true,
        required:true
    },

    image:{
        type:String,
        trim:true,
        required:true
    },

    price:{
        type:Number,
        trim:true,
        required:true
    },

    description:{
        type:String,
        trim:true,
        required:true
    },
    
},{timestamps:true});

const product = mongoose.model('product', productSchema);
module.exports=product;
