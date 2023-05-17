const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  username:{
    type:String,
  required:true,
  }, 
  Email:{
    type:String,
  required:true,
  }, 
  password:{
    type:String,
  required:true,
  }, 
  Type:{
    type:String,
  required:true,
  }, 
  phonee:{
    type:Number,
  required:true,
  }, 
  birth:{
    type:Date,
  required:true,
  }, 
  gender:{
    type:String,
  required:true,
  }, 
},{timestamps:true});
const client = mongoose.model('client', clientSchema);
module.exports=client;
