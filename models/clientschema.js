const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypt = require("bcrypt");
// const orderschema=require("./productschema");

////////


////////

const clientSchema = new Schema({
  // child:orderschema,
  // children:[orderschema],
  username:{
    type:String,
  }, 
  Email:{
    type:String,
  }, 
  password:{
    type:String,
  }, 
  Type:{
    type:String,
  },
  reset_password_token:{
    type:String,
    required:false,
    default: "no token"
  }, 
  phonee:{
    type:Number,
  }, 
  address:{
    type:String,
  //required:true,
  }, 
  gender:{
    type:String,
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
// exports.update=async function(req,res) {
//   try {
//     const salt= await crypt.genSalt(10);
//     const hash =await crypt.hash(this.password, salt);
//   this.password=hash;
//   next();
    
//   } catch (error) {
//     next(error);
//   }
//   let updateuser=await clientSchema.findByIdAndUpdate
// }

clientSchema.methods.comparepass =async function(password){
  try {
    return await crypt.compare(password,this.password);
  } catch (error) {
    throw error;
  }
};

const Clients= mongoose.model('Clients', clientSchema);
module.exports=Clients;






