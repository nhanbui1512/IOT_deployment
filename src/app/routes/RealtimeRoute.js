const express = require("express");
const RealtimeController = require("../controllers/RealtimeController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Realtime
 *   description: Realtime APIs
 */

/**
 * @swagger
 * /realtime/write:
 *   post:
 *     summary: Write data
 *     tags: [Realtime]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *             required:
 *               - value
 *     responses:
 *       '200':
 *          description: Write successful
 */
router.post("/write", RealtimeController.write);

/**
 * @swagger
 * /realtime/read:
 *   post:
 *     summary: Read data
 *     tags: [Realtime]
 *     responses:
 *       '200':
 *          description: Read successful
 */
router.post("/read", RealtimeController.read);

module.exports = router;
