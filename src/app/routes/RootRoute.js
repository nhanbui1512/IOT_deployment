const express = require("express");
const RootController = require("../controllers/RootController");
const router = express.Router();

router.get("/", RootController.index);

module.exports = router;
