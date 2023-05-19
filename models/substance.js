const mongoose = require('mongoose');

const substanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Substance = mongoose.model('Substance', substanceSchema);

module.exports = Substance;
