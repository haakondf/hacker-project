const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  user: String,
  post: Schema.Types.Mixed,
  date: Schema.Types.Mixed,
});

module.exports = mongoose.model("Forum", forumSchema);
