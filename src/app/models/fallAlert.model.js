const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const FallAlert = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    device_id: { type: Schema.Types.ObjectId, ref: "Device" },
    alert_type: { type: String, required: true },
    handled: { type: Boolean, default: false },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Add virtual field
FallAlert.virtual("fromNowOn").get(function () {
  return moment(this.createdAt).fromNow(); // Format the createdAt date using moment
});

// Ensure virtuals are included in JSON and Object output
FallAlert.set("toJSON", { virtuals: true });
FallAlert.set("toObject", { virtuals: true });

module.exports = mongoose.model("FallAlert", FallAlert);
