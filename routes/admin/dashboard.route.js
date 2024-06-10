const express = require("express");
const router = express.Router();
const controllerDashboard = require("../../controllers/admin/dashboard.controller");

router.get("/", controllerDashboard.index);

module.exports = router;