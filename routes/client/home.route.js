const express = require("express");
const router = express.Router();
const controllerHome = require("../../controllers/client/home.controller");

router.get("/", controllerHome.index);

module.exports = router;