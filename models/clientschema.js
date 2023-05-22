const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypt = require("bcrypt");

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
  reset_password_token:{
    type:String,
    required:false,
    default: "no token"
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

clientSchema.pre('save',async function(next){
try {
  const salt= await crypt.genSalt(10);
  const hash =await crypt.hash(this.password, salt);
this.password=hash;
next();
  
} catch (error) {
  next(error);
}


});

clientSchema.methods.comparepass =async function(password){
  try {
    return await crypt.compare(password,this.password);
  } catch (error) {
    throw error;
  }
};

const clients= mongoose.model('clients', clientSchema);
module.exports=clients;

const productsschema=new Schema({
  type:string,
  required:true,
  child:clientSchema,
});
const products=mongoose.model('products',productsschema);
module.exports=products;


