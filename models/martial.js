const mongoose = require('mongoose');

const martialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Martial = mongoose.model('Martial', martialSchema);

module.exports = Martial;
