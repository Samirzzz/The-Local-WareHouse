// Assuming you're using Mongoose for MongoDB
const mongoose = require('mongoose');
// const { Schema } = mongoose;


// Define the order schema
const OrderItemScehma = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  internalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  // Add more fields as needed
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const OrderScehma = new mongoose.Schema({
    items: [OrderItemScehma],
    email:String,
  });

// Create the Order model
const Order = mongoose.model('Order', OrderScehma);

// Export the Order model
module.exports = Order;
