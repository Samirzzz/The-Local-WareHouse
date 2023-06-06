// Assuming you're using Mongoose for MongoDB
const mongoose = require('mongoose');
// const { Schema } = mongoose;


// Define the order schema
const CartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  internalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  amount:{
    type:Number
  },
  // Add more fields as needed
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const purchaseSchema = new mongoose.Schema({//buy now
    items: [CartItemSchema],
    paidAt: {type: Date,
    default: Date.now}
  });

  const userPaymentsSchema = new mongoose.Schema({//history kolo lel 1
    orders: [purchaseSchema],
    email:String,
  });
// Create the Order model
const UserPayments = mongoose.model('UserPayments', userPaymentsSchema);

// Export the Order model
module.exports =UserPayments ;
