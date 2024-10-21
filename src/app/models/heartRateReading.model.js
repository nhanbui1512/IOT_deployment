const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeartRateReading = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    device_id: { type: Schema.Types.ObjectId, ref: "Device" },
    heart_rate: { type: Number, required: true },
    oxygen: { type: Number, require: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HeartRateReading", HeartRateReading);
