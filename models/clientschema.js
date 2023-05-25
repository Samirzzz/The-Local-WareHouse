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

const Clients= mongoose.model('Clients', clientSchema);
module.exports=Clients;




//orderschema inside productschema


// const orderschema=new Schema({
//   child:clientSchema,
//   client:{
//     type:String,
//   },
//   orderproduct:{
//     type:String,
//   },
//   orderprice:{
//     type:Number,
//     default:0,
//   },
//   orderdate:String,
//   status:{
//     type:Boolean,
//     default:false,
//   },
// },
// {timestamps:true});


// const Order=mongoose.model('Order',orderschema);
// module.exports=Order;

// exports.createorder=async(req,res)=>{
//   const neworder=new order(req.body)
//   neworder.save();

//   return res.status(200).json({
//     client:neworder.client,
//     orderproduct:neworder.orderproduct,
//     orderprice:neworder.orderprice,
//     orderdate:neworder.orderdate,
//     status:neworder.status
//   })
// }

// // const[order, setOrder] = useRef(); 

// const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const res = await post(GET_ORDERS_URL, {
//           client: {
//             firstname: firstname,
//             lastname: lastname,
//             numTel: numTel,
//             address: address,
//           },
//           orderproduct: orderproduct,
//           orderprice: orderprice,
//           orderdate: orderdate,
//         });

//         setOrder(res.data);
//         console.log("Order ", order);
//       } catch (error) {
//         console.log(error);
//       }
//   };

