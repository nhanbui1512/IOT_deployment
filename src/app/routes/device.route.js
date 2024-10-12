const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/device.controller");
const { authMiddleWare } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Device
 *   description: Device APIs
 */

/**
 * @swagger

 * /devices:
 *   post:
 *     summary: Create device
 *     tags: [Device]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             type: object
 *             properties:
 *               deviceName:
 *                 type: string
 *               deviceType:
 *                 type: string
 *               serialNumber:
 *                 type: string
 *             required:
 *               - deviceName
 *               - deviceType
 *               - serialNumber
 *     responses:
 *       '200':
 *          description: Successful
 */
router.post("/", authMiddleWare, deviceController.createDevice);

/**
 * @swagger

 * /devices:
 *   get:
 *     summary: Get devices
 *     tags: [Device]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *          description: Successful
 */
router.get("/", authMiddleWare, deviceController.getAllDevices);

/**
 * @swagger

 * /devices/{id}:
 *   get:
 *     summary: Get device by id
 *     tags: [Device]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          default: ""
 *        required: true
 *        description: value
 *     responses:
 *       '200':
 *          description: Successful
 */
router.get("/:id", authMiddleWare, deviceController.getDeviceById);

/**
 * @swagger

 * /devices/{id}:
 *   put:
 *     summary: Update device information
 *     tags: [Device]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          default: ""
 *        required: true
 *        description: value
 *     requestBody:
 *       required: true
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             type: object
 *             properties:
 *               deviceName:
 *                 type: string
 *               deviceType:
 *                 type: string
 *             required:
 *               - deviceName
 *               - deviceType
 *     responses:
 *       '200':
 *          description: Successful
 */
router.put("/:id", authMiddleWare, deviceController.updateDevice);

/**
 * @swagger

 * /devices/{id}:
 *   delete:
 *     summary: Delete device
 *     tags: [Device]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          default: ""
 *        required: true
 *        description: value
 *     responses:
 *       '200':
 *          description: Successful
 */
router.delete("/:id", authMiddleWare, deviceController.deleteDevice);

module.exports = router;
