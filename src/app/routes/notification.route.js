const express = require("express");
const notificationController = require("../controllers/notification.controller");
const { authMiddleWare } = require("../middlewares/auth.middleware");
const {
  getDataVal,
  createDataVal,
} = require("../validations/notification.validation");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification APIs
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get notifications
 *     tags: [Notification]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: true
 *        description: page of data
 *      - in: query
 *        name: per_page
 *        schema:
 *          type: integer
 *        required: true
 *        description: page of data
 *     responses:
 *       '200':
 *          description: Get data successful
 */
router.get(
  "/",
  authMiddleWare,
  getDataVal,
  notificationController.getNotifications
);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Push notifications
 *     tags: [Notification]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - deviceId
 *               - message
 *     responses:
 *       '200':
 *          description: Write successful
 */
router.post("/", createDataVal, notificationController.createNotification);

/**
 * @swagger
 * /notifications:
 *   patch:
 *     summary: Read notification
 *     tags: [Notification]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: notify_id
 *        schema:
 *          type: string
 *        required: true
 *        description: notification id
 *     responses:
 *       '200':
 *          description: Get data successful
 */
router.patch("/", authMiddleWare, notificationController.readNotification);

/**
 * @swagger
 * /notifications:
 *   delete:
 *     summary: Delete notification
 *     tags: [Notification]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: notify_id
 *        schema:
 *          type: string
 *        required: true
 *        description: notification id
 *     responses:
 *       '200':
 *          description: Get data successful
 */
router.delete("/", authMiddleWare, notificationController.deleteNotification);

module.exports = router;
