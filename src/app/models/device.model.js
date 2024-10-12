const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Device = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    device_name: { type: String, required: true },
    device_type: { type: String, required: true },
    serial_number: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Device", Device);
