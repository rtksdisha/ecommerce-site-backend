const Order = require("../models/order");
const ProductService = require("../services/product-service");

const OrderModel = require("../models/order");

const saveOrder = async (order) => {
  //passing array by direction
  //export as the function is calling another function in the same file
  await module.exports.addTotalToOrder(order);

  //create an instance of order, so that test can pass
  const newOrder = new Order(order);
  await newOrder.save();

  return newOrder.toObject();
};

const addTotalToOrder = async (order) => {
  let total = 0;

  for await (const productId of order.products) {
    const product = await ProductService.getProductById(productId);
    total += product.price;
  }

  //the value used by the test
  order.total = total;
};

module.exports = { saveOrder, addTotalToOrder };
