const express = require("express");
const router = express.Router();
const controllerProduct = require("../../controllers/admin/product.controller");

router.get("/", controllerProduct.index);

module.exports = router;