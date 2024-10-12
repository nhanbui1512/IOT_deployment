const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Statistic = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  period: { type: String, required: true },
  average_heart_value: { type: Number, required: true },
  min_heart_rate: { type: Number, required: true },
  max_heart_rate: { type: Number, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
});

module.exports = mongoose.model("Statistic", Statistic);
