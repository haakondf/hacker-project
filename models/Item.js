const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    type: String,
    price: Number,
    bonus: Number,
});

module.exports = mongoose.model('Item', itemSchema);

