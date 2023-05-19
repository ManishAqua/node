const mongoose = require('mongoose');

const religionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Religion = mongoose.model('Religion', religionSchema);

module.exports = Religion;
