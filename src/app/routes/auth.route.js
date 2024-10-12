const express = require("express");

const {
  signup,
  login,
  logout,
  getProfile,
  changePassword,
} = require("../controllers/auth.controller");
const { authMiddleWare } = require("../middlewares/auth.middleware");
const { changePassValidation } = require("../validations/auth.validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth APIs
 */

/**
 * @swagger

 * /auth/signup:
 *   post:
 *     summary: Signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '200':
 *          description: Successful
 */

router.post("/signup", signup);

/**
 * @swagger

 * /auth/login:
 *   post:
 *     summary: Login by email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: "user@gmail.com"
 *               password: 
 *                 type: string
 *                 default: "password"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 *
 */
router.post("/login", login);

/**
 * @swagger

 * /auth/me:
 *   get:
 *     summary: Get my profile
 *     tags: [Auth]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */

router.get("/me", authMiddleWare, getProfile);

/**
 * @swagger

 * /auth/password:
 *   put:
 *     summary: Change password
 *     tags: [Auth]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */
router.put("/password", changePassValidation, authMiddleWare, changePassword);

module.exports = router;
