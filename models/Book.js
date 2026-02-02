const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    cost: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);