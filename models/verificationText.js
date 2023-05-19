const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  heading1: {
    type: String,
    required: true,
  },
  heading2: {
    type: String,
    required: true,
  },
  para1: String,
  para2: String,
});

module.exports = mongoose.model('VerificationText', schema);
