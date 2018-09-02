const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    googleId: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
})

module.exports = mongoose.model('User', userSchema)
