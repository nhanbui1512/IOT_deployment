const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/statistic.controller");
const { getDataVal } = require("../validations/statistic.validation");
const { authMiddleWare } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Statistic
 *   description: Statistic APIs
 */

/**
 * @swagger

 * /statistics:
 *   get:
 *     summary: get data statistic
 *     tags: [Statistic]
 *     parameters:
 *      - in: query
 *        name: date
 *        schema:
 *          type: string
 *          format: datetime
 *        required: true
 *        description: date of data
 *      - in: query
 *        name: deviceId
 *        schema:
 *          type: string
 *        required: true
 *        description: id of device
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: query type
 *        default: average
 *      - in: query
 *        name: month
 *        schema:
 *          type: integer
 *        required: false
 *        description: month of data if query data of a month. If get data of a month, year is requied
 *      - in: query
 *        name: year
 *        schema:
 *          type: integer
 *        required: false
 *        description: year of data if query data of a year
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 *
 */
router.get("/", getDataVal, authMiddleWare, statisticController.getData);

module.exports = router;
