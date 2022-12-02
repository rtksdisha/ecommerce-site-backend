const Product = require("../models/product");

// contains the business logic of the service
const getProducts = async () => {
  //exec return a promise, so we wait for the response from the DB
  //lean tranforms the document into js object
  const products = await Product.find().lean().exec();
  return products;
};

const saveProduct = async (product) => {
  const savedProduct = new Product(product);
  await savedProduct.save();
  return savedProduct;
};

const getProductById = async (id) => {
  const product = Product.findById(id).lean().exec();

  return product;
};

module.exports = {
  getProducts,
  saveProduct,
  getProductById,
};
