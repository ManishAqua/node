const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the height model
const heightSchema = new Schema({
    feet: Number,
    inches: Number
  });

const Height = mongoose.model('Height', heightSchema);

module.exports = Height;
