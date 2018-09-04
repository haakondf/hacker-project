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
    
    // Player picture
    imgName: String,
    imgPath: String,
    //Player stats
    maxFirewall: {
        type: Number,
        default: 100,
    },
    currentFirewall: {
        type: Number,
        default: 100,
    },
    cpu: {
        type: Number,
        default: 10,
    },
    antiVirus: {
        type: Number,
        default: 3,
    },
    dodge: {
        type: Number,
        default: 10
    },
    crimeSkill: {
        type: Number,
        default: 100
    },
    battery: {
        type: Number,
        default: 100
    },


    //Player possessions
    bitCoins: {
        type: Number,
        default: 0,
    },
    bounty: {
        type: Number,
        default: 0,
    },

    //Player information
    rank: {
        type: String,
        default: 0,
    },
    alliance: String,
    shutdowns: {
        type: Number,
        default: 0,
    },
    networth: {
        type: Number,
        default: 0,
    },

    //Figth accessories
    inCombat: {
        type: Boolean,
        default: false,
    },

    inHideout: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps:{ 
        createdAt: "createdAt", updatedAt: "updatedAt" 
    }
})

userSchema.methods.fightCrime = function (opponent) {
    fight(this, opponent);
}


module.exports = mongoose.model('User', userSchema)
