const express = require("express");

const orderController = require("../controller/orders-controller");

const router = express.Router();

router.post("/", orderController.saveOrder);

module.exports = { router };
