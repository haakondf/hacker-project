const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Rank = require("./Rank");
const Item = require("./Item");

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
    statPoints: {
      type: Number,
      default: 5
    },
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
        ref: "Item",
        default: null
      },
      firewall: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: null
      },
      avs: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: null
      },
      encryption: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: null
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
      default: 10000
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
  this.battery -= 7;
  let results = {
    rounds: [],
    currentHp: [],
    maxHp: opponent.maxFirewall,
    won: false,
    levelUp: false,
    gains: {
      exp: 0,
      bitCoins: 0,
      battery: 0,
      crime: 0,
      expToLevel: this.expToLevel
    }
  };
  let updatedResults = this.fightCrimeBattle(opponent, results);
  if (this.exp >= this.expToLevel) {
    updatedResults.levelUp = true;
    this.statPoints += 5;
    this.rank += 1;
    Rank.findOne({ rank: this.rank }).then(newRank => {
      this.rankName = newRank.name;
      this.expToLevel = newRank.expToNewRank;
      this.save();
    });
  }
  return updatedResults;
};
// TODO if (this.battery < 14) { this.battery = 0 } --------- preventing minus battery
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
    let moneyChange =
      Math.floor(Math.random() * (opponent.difficulty * 1000)) +
      opponent.difficulty * 500;
    let expChange =
      Math.floor(Math.random() * 300) + opponent.difficulty * 200 + 100;
    let crimeChange = Math.floor(Math.random() * opponent.difficulty) + 1;
    this.bitCoins += moneyChange;
    this.networth += moneyChange;
    this.exp += expChange;
    this.crimeSkill += crimeChange;
    if (this.crimeSkill > 1000) this.crimeSkill = 1000;
    results.gains.exp = expChange;
    results.gains.bitCoins = moneyChange;
    results.gains.battery = -7;
    results.gains.crime = crimeChange;
    this.failedAttempts = 0;
    this.save();
    return results;
    //Combat won over
  } else if (encryptionOccurance >= 0.8 + this.crimeSkill / 100) {
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
  if (this.exp >= this.expToLevel) {
    updatedResults.levelUp = true;
    this.statPoints += 5;
    this.rank += 1;
    Rank.findOne({ rank: this.rank }).then(newRank => {
      this.rankName = newRank.name;
      this.expToLevel = newRank.expToNewRank;
      this.save();
    });
  }
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
          500 +
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
    this.shutdowns += 1;
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
  }, 1800 * 1000);
};

userSchema.methods.partialRepair = function() {
  if ((this.currentFirewall * 100) / this.maxFirewall > 85) {
    this.bitCoins -= 3000;
    this.currentFirewall = this.maxFirewall;
  } else {
    this.bitCoins -= 3000;
    this.currentFirewall += (15 * this.maxFirewall) / 100;
  }
  return this.save();
};

userSchema.methods.systemFullRepair = function() {
  this.bitCoins -= 12000;
  this.currentFirewall = this.maxFirewall;
  return this.save();
};
// only level 9 web developers knows what's going on underneath.
userSchema.methods.addItem = function(item) {
  const currentItem = this.items[item.type];
  let p = Promise.resolve(null);
  if (currentItem) {
    if (currentItem.bonus) {
      p = Promise.resolve(currentItem);
    } else {
      p = Item.findById(currentItem);
    }
  }

  p.then(currentItem => {
    if (currentItem) {
      // lower the stats
      switch (currentItem.type) {
        case "cpu":
          this.cpu -= currentItem.bonus;
          break;
        case "avs":
          this.antiVirus -= currentItem.bonus;
          break;
        case "firewall":
          this.maxFirewall -= currentItem.bonus;
          this.currentFirewall -= currentItem.bonus;
          break;
        case "encryption":
          this.encryption -= currentItem.bonus;
          break;
      }
    }

    this.items[item.type] = item;

    switch (item.type) {
      case "cpu":
        this.cpu += item.bonus;
        break;
      case "avs":
        this.antiVirus += item.bonus;
        break;
      case "firewall":
        this.maxFirewall += item.bonus;
        this.currentFirewall += item.bonus;
        break;
      case "encryption":
        this.encryption += item.bonus;
        break;
    }

    return this.save();
  });
};

module.exports = mongoose.model("User", userSchema);
