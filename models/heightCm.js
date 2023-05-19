const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the height model
const heightSchema = new Schema({
    cm: Number,
  });

const HeightCm = mongoose.model('HeightCm', heightSchema);

module.exports = HeightCm;
