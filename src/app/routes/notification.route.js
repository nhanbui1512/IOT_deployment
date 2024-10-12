const express = require("express");
const notificationController = require("../controllers/notification.controller");
const { authMiddleWare } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/", authMiddleWare, notificationController.getNotifications);

module.exports = router;
