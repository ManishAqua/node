const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the income model
const incomeSchema = new Schema({
    minIncome: Number,
    maxIncome: Number,
    lastValue: Number
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
