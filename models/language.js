const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
