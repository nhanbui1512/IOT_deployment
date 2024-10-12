const express = require("express");
const router = express.Router();
const heartRateReadingController = require("../controllers/heartRateReading.controller");
const { authMiddleWare } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Heart Rates
 *   description: Heart Rates APIs
 */

/**
 * @swagger

 * /heart-rates:
 *   post:
 *     summary: Create data
 *     tags: [Heart Rates]
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
 *               heartRatevalue:
 *                 format: date
 *                 type: integer
 *             required:
 *               - deviceId
 *               - heartRateValue
 *     responses:
 *       '200':
 *          description: Successful
 */
router.post(
  "/",
  authMiddleWare,
  heartRateReadingController.createHeartRateReading
);

/**
 * @swagger

 * /heart-rates:
 *   get:
 *     summary: Get data
 *     tags: [Heart Rates]
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
 *                 description: id of device
 *               from:
 *                 format: date
 *                 description: start day
 *               to:
 *                 format: date
 *                 description: end day
 *             required:
 *               - deviceId
 *               - from
 *               - to
 *     responses:
 *       '200':
 *          description: Successful
 */
router.get("/", authMiddleWare, heartRateReadingController.getData);
module.exports = router;
