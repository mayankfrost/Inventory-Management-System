const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})

const itemdb = mongoose.model('itemdb', schema);

module.exports = itemdb;