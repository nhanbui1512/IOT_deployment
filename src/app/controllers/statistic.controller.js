const {
  groupByDayOfWeek,
  calculateAverage,
} = require("../utils/statisticData");
const ValidationError = require("../errors/ValidationError");
const heartRateReadingModel = require("../models/heartRateReading.model");
const Statistic = require("../models/statistic.model");
const {
  getDataByYear,
  getDataByMonthOfYear,
} = require("../services/statistic.services");

function getMondayAndSunday(date) {
  // Sao chép đối tượng date để không thay đổi date gốc
  let currentDate = new Date(date);

  // Xác định ngày hiện tại là thứ mấy (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
  let currentDay = currentDate.getDay();

  // Nếu là Chủ Nhật thì đặt currentDay thành 7 (vì Chủ Nhật là ngày cuối tuần)
  currentDay = currentDay === 0 ? 7 : currentDay;

  // Tính thứ Hai
  let monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - (currentDay - 1));

  // Tính Chủ Nhật
  let sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() + (7 - currentDay));

  return { monday, sunday };
}

class statisticController {
  // Create a new statistic
  createStatistic = async (req, res) => {
    try {
      const statistic = new Statistic(req.body);
      const savedStatistic = await statistic.save();
      res.status(201).json(savedStatistic);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getData = async (req, response) => {
    const userId = req.userId;
    const { date, deviceId, type, month, year } = req.query;

    if (month && !year)
      throw new ValidationError({ message: "year is required" });

    if (month && year) {
      const data = await getDataByMonthOfYear(month, year);
      return response.status(200).json({ data });
    }

    if (year) {
      const data = await getDataByYear(year);
      return response.status(200).json({ data: data });
    }

    const givenDay = new Date(date);
    let { monday, sunday } = getMondayAndSunday(givenDay);

    const heartRates = await heartRateReadingModel.find({
      device_id: deviceId,
      user_id: userId,
      createdAt: {
        $gte: monday, // Ngày bắt đầu
        $lte: sunday, // Ngày kết thúc
      },
    });

    const formatData = groupByDayOfWeek(heartRates);

    if (type === "average") {
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      days.forEach((day) => {
        formatData[day] = Math.floor(calculateAverage(formatData[day]));
      });
    }

    return response.status(200).json({
      data: formatData,
    });
  };
}

module.exports = new statisticController();
