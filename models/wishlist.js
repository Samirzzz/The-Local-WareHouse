// Assuming you're using Mongoose for MongoDB
const mongoose = require('mongoose');

// Define the Wishlist schema
const wishlistItemScehma = new mongoose.Schema({
  productId: {
    type: Number,
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

const wishlistScehma = new mongoose.Schema({
    items: [wishlistItemScehma],
    email:String,
  });

// Create the Wishlist model
const Wishlist = mongoose.model('Wishlist', wishlistScehma);

// Export the Wishlist model
module.exports = Wishlist;
