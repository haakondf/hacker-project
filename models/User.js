const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //Account information
  email: String,
  password: String,
  googleId: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  //Character information
  name: String,
  //Player stats
  maxFirewall: {
    type: Number,
    default: 100
  },
  currentFirewall: {
    type: Number,
    default: 100
  },
  cpu: {
    type: Number,
    default: 10
  },
  antiVirus: {
    type: Number,
    default: 3
  },
  dodge: {
    type: Number,
    default: 10
  },

  //Player possessions
  bitCoins: {
    type: Number,
    default: 0
  },
  bounty: {
    type: Number,
    default: 0
  },

  //Player information
  rank: {
    type: String,
    default: 0
  },
  alliance: String,
  shutdowns: {
    type: Number,
    default: 0
  },
  networth: {
    type: Number,
    default: 0
  },

  //Figth accessories
  inCombat: {
    type: Boolean,
    default: false
  },

  failedAttempts: {
    type: Number,
    default: 0
  },

//   roundNumber: {
//     type: Number,
//     default: 0
//   }
});

userSchema.methods.fightCrime = function(opponent) {
  let results = {
    rounds: [],
    won: false,
    gains: {
      exp: 0,
      bitCoins: 0,
      battery: 0,
      crime: 0
    }
  };
  let dodgeOccurance = Math.random() * (opponent.dodge / this.dodge);
  if (this.failedAttempts === 4) {
    results.gains.battery = -14;
    this.battery -= 7;
    this.roundNumber = 0;
    this.save();
    return results;
  } else if (opponent.currentFirewall <= 0) {
    //Combat won:
    results.won = true;
    let batteryChange = opponent.difficulty * 4 + 2;
    let moneyChange =
      Math.floor(Math.random() * (opponent.difficulty * 1000)) +
      opponent.difficulty * 500;
    let expChange =
      Math.floor(Math.random() * 300) + opponent.difficulty * 100 + 100;
    let crimeChange = Math.floor(Math.random() * opponent.difficulty) + 1;
    this.money += moneyChange;
    this.networth += moneyChange;
    this.exp += expChange;
    this.crimeSkill += crimeChange;
    if (this.crimeSkill > 1000) this.crimeSkill = 1000;
    results.gains.exp = expChange;
    results.gains.bitCoins = moneyChange;
    results.gains.battery = batteryChange;
    results.gains.crime = crimeChange;
    this.roundNumber = 0;
    this.save();
    return results;
  } else if (dodgeOccurance >= 1) {
    this.failedAttempts += 1;
    results.rounds.push("dodge");
    return this.fightCrime(opponent)
  } else 
  opponent.currentFirewall -= this.cpu;
  results.rounds.push("hit")
  return this.fightCrime(opponent)
};

module.exports = mongoose.model("User", userSchema);
