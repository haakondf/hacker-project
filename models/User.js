const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //Account information
    email: String,
    password: String,
    googleId: String,
    //user can be created before character creation, then isSetup = false, after setup, isSetup should be true
    isSetup: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    //Character information
    name: String,

    // Player picture
    imgName: String,
    imgPath: String,
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
    exp: {
        type: Number,
        default: 0,
    },
    expToLevel: {
        type: Number,
        default: 0,
    },

    //Figth accessories
    inCombat: {
      type: Boolean,
      default: false
    },

    failedAttempts: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);


//Hack Crime
userSchema.methods.fightCrime = function(opponent) {
  let results = {
    rounds: [],
    currentHp: [],
    maxHp: opponent.maxFirewall,
    won: false,
    gains: {
      exp: 0,
      bitCoins: 0,
      battery: 0,
      crime: 0,
      expToLevel: this.expToLevel,
    }
  };
  updatedResults = this.fightCrimeBattle(opponent, results);
  return updatedResults;
};

userSchema.methods.fightCrimeBattle = function(opponent, results) {
  let dodgeOccurance = Math.random() * (opponent.dodge / this.dodge);

  if (this.failedAttempts === 4) {
    results.gains.battery = -14;
    this.battery -= 7;
    this.roundNumber = 0;
    this.failedAttempts = 0;
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
    this.bitCoins += moneyChange;
    this.networth += moneyChange;
    this.exp += expChange;
    this.crimeSkill += crimeChange;
    if (this.crimeSkill > 1000) this.crimeSkill = 1000;
    results.gains.exp = expChange;
    results.gains.bitCoins = moneyChange;
    results.gains.battery = batteryChange;
    results.gains.crime = crimeChange;
    this.failedAttempts = 0;
    this.save();
    return results;
    //Combat won over
  } else if (dodgeOccurance >= (0.9 + (this.crimeSkill/100))) {
    this.failedAttempts += 1;
    results.rounds.push("dodge");
    results.currentHp.push(opponent.currentFirewall);
    return this.fightCrimeBattle(opponent, results);
  } else 
  opponent.currentFirewall -= this.cpu + (this.crimeSkill/10);
  results.rounds.push("hit");
  if (opponent.currentFirewall < 0) opponent.currentFirewall = 0;
  results.currentHp.push(opponent.currentFirewall);
  return this.fightCrimeBattle(opponent, results);
};

//Hack players PvP
userSchema.methods.hackPlayer = function(opponent) {
    let results = {
        rounds: [],
        gains: {
            exp: 0,
            bitCoins: 0,
            battery: 0,
            crime: 0,
            expToLevel: this.expToLevel,
          }
    }

    this.hackPlayerBattle(opponent, results)
}

userSchema.methods.hackPlayerBattle = function(opponent, results) {
    
}


module.exports = mongoose.model("User", userSchema);
