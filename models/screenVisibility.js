const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('ScreenVisibility', schema);
