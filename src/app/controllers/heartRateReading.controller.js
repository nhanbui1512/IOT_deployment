const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
const deviceModel = require("../models/device.model");
const HeartRateReading = require("../models/heartRateReading.model");
const moment = require("moment");

class heartRateReadingController {
  createHeartRateReading = async (req, response) => {
    const userId = req.userId;
    const deviceId = req.body.deviceId;
    const heartRateValue = req.body.heartRateValue;
    if (!deviceId || !heartRateValue)
      throw new ValidationError({ message: "Data must be filled" });
    const device = await deviceModel.findOne({
      user_id: userId,
      _id: deviceId,
    });
    if (!device) throw new NotFoundError({ message: "Not found device" });
    const newHeartRate = new HeartRateReading({
      device_id: deviceId,
      user_id: userId,
      heart_rate: heartRateValue,
    });

    await newHeartRate.save();

    return response
      .status(200)
      .json({ message: "created", data: newHeartRate });
  };

  getData = async (req, response) => {
    const { from, to, deviceId } = req.body;
    const userId = req.userId;
    if (!from || !to)
      throw new ValidationError({ message: "Data must be filled" });

    if (!moment(from, moment.ISO_8601, true).isValid()) {
      return response.status(400).json({ message: "Start date is not valid." });
    }

    if (!moment(to, moment.ISO_8601, true).isValid()) {
      return response.status(400).json({ message: "End date is not valid." });
    }
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const records = await HeartRateReading.find({
      device_id: deviceId,
      user_id: userId,
      createdAt: {
        $gte: fromDate, // Ngày bắt đầu
        $lte: toDate, // Ngày kết thúc
      },
    });

    return response.status(200).json({ data: records });
  };
}
// Create a new heart rate reading

module.exports = new heartRateReadingController();
