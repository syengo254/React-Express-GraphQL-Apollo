const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    genre: String,
    authorId: String,
});

module.exports = mongoose.model('Book', BookSchema);