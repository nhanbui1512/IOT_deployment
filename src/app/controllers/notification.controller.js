const fallAlertModel = require("../models/fallAlert.model");
const { writeRealtime } = require("../../common/firebase");
const NotFoundError = require("../errors/NotFoundError");

class NotificationController {
  async getNotifications(req, response) {
    const userId = req.userId;
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;

    const data = await fallAlertModel
      .find({ user_id: userId })
      .populate("device_id")
      .sort({ createdAt: -1 })
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

  async createNotification(req, response) {
    const { deviceId, message } = req.body;
    const userId = req.userId;

    const newNotify = new fallAlertModel({
      user_id: userId,
      device_id: deviceId,
      alert_type: "Warning",
      hanled: false,
      content: message,
    });

    await newNotify.save();

    //! ở đây còn thiếu thông tin của device và timestamp
    await writeRealtime(req.body.ref, {
      data: { 
        deviceId:  deviceId,
        message: message,
       },
    });

    return response.status(200).json({ data: newNotify });
  }

  async readNotification(req, response) {
    const notify_id = req.query.notify_id;

    const userId = req.userId;
    const notification = await fallAlertModel.findOne({
      _id: notify_id,
      user_id: userId,
    });
    if (!notification)
      throw NotFoundError({ message: "Not found notification" });
    notification.hanled = true;
    await notification.save();

    return response.status(200).json({ message: "Ok" });
  }

  async deleteNotification(req, response) {
    const notify_id = req.query.notify_id;
    const userId = req.userId;

    await fallAlertModel.deleteOne({
      _id: notify_id,
      user_id: userId,
    });

    return response.status(200).json({ message: "Ok" });
  }
}

module.exports = new NotificationController();
