function groupByDayOfWeek(data) {
  // Tạo đối tượng chứa dữ liệu nhóm theo từng ngày trong tuần
  const groupedData = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  // Hàm để lấy tên ngày trong tuần từ đối tượng Date
  function getDayOfWeek(date) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  }

  // Lặp qua từng phần tử dữ liệu và gom nhóm theo ngày
  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const dayOfWeek = getDayOfWeek(date); // Lấy tên ngày trong tuần

    // Đưa dữ liệu heart_rate vào nhóm ngày tương ứng
    groupedData[dayOfWeek].push(item.heart_rate);
  });

  return groupedData;
}

function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum / numbers.length;
}

module.exports = {
  groupByDayOfWeek,
  calculateAverage,
};
