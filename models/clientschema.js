const mongoose = require('mongoose');
const { Schema } = mongoose;

const client = new Schema({
  username: String, // String is shorthand for {type: String}
  Email: String,
  password: String,
  phonee: Number,
  birth: Date,
  gender: String,
});
const Sign = mongoose.model('Sign', client);
module.exports=Sign;
