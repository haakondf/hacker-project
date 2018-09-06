const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //Account information
    email: {
      type: String,
      unique: true
    },
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
    name: {
      type: String,
      unique: true
    },
    alliance: {
      type: String,
      enum: ["White hats", "Black hats"],
      default: "White hats"
    },

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
      default: 5
    },
    encryption: {
      type: Number,
      default: 10
    },
    crimeSkill: {
      type: Number,
      default: 0
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

    items: {
      cpu: {
        type: Schema.Types.ObjectId,
        ref: "Item"
      },
      firewall: {
        type: Schema.Types.ObjectId,
        ref: "Item"
      },
      avs: {
        type: Schema.Types.ObjectId,
        ref: "Item"
      },
      encryption: {
        type: Schema.Types.ObjectId,
        ref: "Item"
      }
    },

    //Player information
    rank: {
      type: Number,
      default: 0
    },

    rankName: {
      type: String,
      default: "Script kiddie"
    },
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
      default: 0
    },
    expToLevel: {
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

    gracePeriod: {
      type: Boolean,
      default: false
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
  console.log(opponent);
  this.battery -= 7;
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
      expToLevel: this.expToLevel
    }
  };
  updatedResults = this.fightCrimeBattle(opponent, results);
  return updatedResults;
};

userSchema.methods.fightCrimeBattle = function(opponent, results) {
  let encryptionOccurance =
    Math.random() * (opponent.encryption / this.encryption);
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
  } else if (encryptionOccurance >= 0.9 + this.crimeSkill / 100) {
    this.failedAttempts += 1;
    results.rounds.push("encryption");
    results.currentHp.push(opponent.currentFirewall);
    return this.fightCrimeBattle(opponent, results);
  } else opponent.currentFirewall -= this.cpu + this.crimeSkill / 10;
  results.rounds.push("hit");
  if (opponent.currentFirewall < 0) opponent.currentFirewall = 0;
  results.currentHp.push(opponent.currentFirewall);
  return this.fightCrimeBattle(opponent, results);
};

//Hack players PvP
userSchema.methods.hackPlayer = function(opponentPlayer) {
  this.battery -= 7;
  let results = {
    rounds: [],
    maxHp: opponentPlayer.currentFirewall,
    currentHp: [],
    won: false,
    gains: {
      exp: 0,
      bitCoins: 0,
      bounty: 0,
      battery: 0,
      expToLevel: this.expToLevel
    }
  };
  let updatedResults = this.hackPlayerBattle(opponentPlayer, results);
  return updatedResults;
};

userSchema.methods.hackPlayerBattle = function(opponentPlayer, results) {
  let encryptionOccurance =
    Math.random() + (opponentPlayer.encryption / this.encryption) * 0.4;
  if (this.failedAttempts === 4) {
    results.gains.battery = -14;
    this.battery -= 7;
    this.roundNumber = 0;
    this.failedAttempts = 0;
    opponentPlayer.save();
    this.save();
    return results;
  } else if (opponentPlayer.currentFirewall <= 0) {
    //Combat won:
    results.won = true;
    let moneyChange = opponentPlayer.bitCoins;
    let expChange = Math.floor(
      Math.random() * 300 +
        (opponentPlayer.rank + 1) *
          15 *
          ((opponentPlayer.rank + 1) / (this.rank + 1)) *
          100 +
        100
    );
    this.bitCoins += moneyChange;
    this.bitCoins += opponentPlayer.bounty;
    this.networth += opponentPlayer.bounty;
    results.gains.bounty += opponentPlayer.bounty;
    opponentPlayer.bounty = 0;
    opponentPlayer.bitCoins -= moneyChange;
    opponentPlayer.networth -= moneyChange;
    this.networth += moneyChange;
    this.exp += expChange;
    results.gains.exp = expChange;
    results.gains.bitCoins = moneyChange;
    results.gains.battery = -7;
    this.failedAttempts = 0;
    opponentPlayer.gracePeriod = true;
    this.gracePeriodFunction(opponentPlayer);
    opponentPlayer.save();
    this.save();
    return results;
  } else if (encryptionOccurance >= 1) {
    this.failedAttempts += 1;
    results.rounds.push("encryption");
    results.currentHp.push(opponentPlayer.currentFirewall);
    return this.hackPlayerBattle(opponentPlayer, results);
  } else
    opponentPlayer.currentFirewall -=
      this.cpu / (opponentPlayer.antiVirus * 0.5);
  results.rounds.push("hit");
  if (opponentPlayer.currentFirewall < 0) opponentPlayer.currentFirewall = 0;
  results.currentHp.push(opponentPlayer.currentFirewall);
  return this.hackPlayerBattle(opponentPlayer, results);
};

userSchema.methods.gracePeriodFunction = function(opponent) {
  setTimeout(() => {
    opponent.gracePeriod = false;
    opponent.currentFirewall = opponent.maxFirewall;
    opponent.save();
  }, 2 * 3600 * 1000);
};

module.exports = mongoose.model("User", userSchema);
