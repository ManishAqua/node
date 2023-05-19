const mongoose = require('mongoose');

const occupationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Occupation = mongoose.model('Occupation', occupationSchema);

module.exports = Occupation;
