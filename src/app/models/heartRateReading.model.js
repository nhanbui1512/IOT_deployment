const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

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

// Add virtual field
HeartRateReading.virtual("fromNowOn").get(function () {
  return moment(this.createdAt).fromNow(); // Format the createdAt date using moment
});

// Ensure virtuals are included in JSON and Object output
HeartRateReading.set("toJSON", { virtuals: true });
HeartRateReading.set("toObject", { virtuals: true });

module.exports = mongoose.model("HeartRateReading", HeartRateReading);
