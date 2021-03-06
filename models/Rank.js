const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rankSchema = new Schema({
  name: String,
  rank: Number,
  expToNewRank: {
      type: Number,
      default: 10000,
  }
});

module.exports = mongoose.model("Rank", rankSchema);