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
    bounty: Number,

    //Player information
    rank: String,
    alliance: String,
    

    //Figth accessories
    inCombat: Boolean,
})

userSchema.methods.fightCrime = function (opponent) {
    fight(this, opponent);
}


module.exports = mongoose.model('User', userSchema)
