const { calculateAverage } = require("../utils/statisticData");
const heartRateReadingModel = require("../models/heartRateReading.model");

async function getDataByYear(year) {
  try {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year + 1}-01-01`);

    const records = await heartRateReadingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lt: end }, // Lọc theo năm
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Nhóm theo tháng
          records: { $push: "$$ROOT" }, // Đưa toàn bộ document vào mảng 'records'
        },
      },
      {
        $sort: { _id: 1 }, // Sắp xếp theo tháng (từ 1 đến 12)
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const data = {};

    monthNames.forEach((month, index) => {
      const dataOfMonth = records.find((item) => item._id === index + 1);
      if (dataOfMonth) {
        const heartRates = dataOfMonth.records.map((rc) => rc.heart_rate);
        const minValue = Math.min(...heartRates);
        const maxValue = Math.max(...heartRates);
        const averageValue = Math.floor(calculateAverage(heartRates));

        data[month] = {
          min: minValue,
          max: maxValue,
          averageValue,
        };
      } else {
        data[month] = {
          min: 0,
          max: 0,
          average: 0,
        };
      }
    });

    const result = monthNames.map((month) => {
      return { name: month, ...data[month] };
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function getDataByMonthOfYear(month, year) {
  try {
    // Ngày bắt đầu của tháng
    const start = new Date(year, month - 1, 1);
    // Ngày bắt đầu của tháng tiếp theo
    const end = new Date(year, month, 1);

    // Lấy số ngày trong tháng (tháng 0-indexed)
    const daysInMonth = new Date(year, month, 0).getDate();

    const records = await heartRateReadingModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          records: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Tạo một mảng cho toàn bộ các ngày trong tháng
    const fullMonthData = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = records.find((record) => record._id === day);
      fullMonthData.push({
        day: day,
        records: dayData ? dayData.records : [], // Nếu không có dữ liệu thì records là mảng rỗng
      });
    }

    fullMonthData.forEach((item) => {
      const heartRates = item.records.map((rc) => rc.heart_rate);
      item.average = Math.floor(calculateAverage(heartRates));
    });

    return fullMonthData;
  } catch (error) {
    throw error;
  }
}

module.exports = { getDataByYear, getDataByMonthOfYear };
