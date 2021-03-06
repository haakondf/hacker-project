const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crimeSchema = new Schema({
  name: String,
  difficulty: Number,
  encryption: Number,
  currentFirewall: Number,
  maxFirewall: Number
});

module.exports = mongoose.model("Crime", crimeSchema);
