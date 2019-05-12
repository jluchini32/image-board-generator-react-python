const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    images: []
})

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;