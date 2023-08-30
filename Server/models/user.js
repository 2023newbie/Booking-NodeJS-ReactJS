const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: {
    type: String,
    required: true,
  },
  fullName: String,
  phoneNumber: Number,
  email: {
    type: String, 
    required: true
  },
  isAdmin: Boolean
})

module.exports = mongoose.model('User', userSchema) 