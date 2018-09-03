const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    //Account information
    email: String,
    password: String,
    googleId: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    
    //Character information
    name: String,
    //Player stats
    maxFirewall: Number,
    currentFirewall: Number,
    cpu: Number,
    antiVirus: Number,
    dodge: Number,


    //Player possessions
    bitCoins: Number,

    //Player information
    

    //Figth accessories
    inCombat: Boolean,
})


module.exports = mongoose.model('User', userSchema)
