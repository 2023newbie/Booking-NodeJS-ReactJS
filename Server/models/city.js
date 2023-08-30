const mongoose = require('mongoose');

const Schema = mongoose.Schema

const citySchema = new Schema({
  name: String,
  subText: String,
  image: String
})

module.exports = mongoose.model('City', citySchema)