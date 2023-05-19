const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    martial: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('BackgroundHeading', schema);
