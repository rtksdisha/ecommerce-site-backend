const express = require("express");
const productsController = require("../controller/products-controller");
const router = express.Router();

//for the path renders the function getProducts from productsController
router.get("/", productsController.getProducts);

// router.post("/", productsController.saveProduct());

// router.put("/:id", () => {});

module.exports = router;
