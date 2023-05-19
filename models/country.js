const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
});

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cities: [citySchema],
  status: {
    type: Boolean,
    default: true
  }
});

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  states: [stateSchema],
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Country', countrySchema);
