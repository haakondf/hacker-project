const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    dodge: Number,
    currentFirewall: Number,
    maxFirewall: Number,
    difficulty: Number,
})

module.exports = mongoose.model('Crime', userSchema)