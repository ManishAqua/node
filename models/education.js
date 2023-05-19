const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
