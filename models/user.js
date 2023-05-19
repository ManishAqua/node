const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  relation: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  height: {
    type: String,
  },
  pincode: {
    type: String,
  },
  education: {
    type: String,
  },
  occupation: {
    type: String,
  },
  worksat: {
    type: String,
  },
  income: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  martial: {
    type: String,
  },
  language: {
    type: [String],
  },
  religion: {
    type: String,
  },
  food: {
    type: String,
  },
  smoke: {
    type: String,
  },
  drink: {
    type: String,
  },
  substance: {
    type: [String],
  },
  profileImages: {
    type: [String]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
