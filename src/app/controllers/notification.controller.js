const fallAlertModel = require("../models/fallAlert.model");

class NotificationController {
  async getNotifications(req, response) {
    const userId = req.userId;
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;

    const data = await fallAlertModel
      .find({ user_id: userId })
      .populate("device_id")
      .limit(per_page)
      .skip((page - 1) * per_page); // Skip to the correct page

    const total = await fallAlertModel.countDocuments({ user_id: userId });
    return response.status(200).json({
      page: Number(page),
      perPage: Number(per_page),
      total,
      data,
    });
  }
}

module.exports = new NotificationController();
