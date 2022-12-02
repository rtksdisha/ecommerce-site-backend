const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//same as checkout in frontend
const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  products: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  total: {
    type: Number,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
