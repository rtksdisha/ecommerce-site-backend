const ProductService = require("../services/product-service");

//GET /products since in index.js we say /products
//controller function, helps call the business logic of the service
//async due to lean
const getProducts = async (req, res) => {
  const products = await ProductService.getProducts();
  console.log(products)
  res.json(products);
};

const saveProduct = async (req, res) => {
  const product = req.body;
  const savedProduct = await ProductService.saveProduct(product);
  res.status(201).json();
  return savedProduct;
};

//export object with all functions
//if the object property and value name is the same,
//you can just write the name once
module.exports = { getProducts, saveProduct };
