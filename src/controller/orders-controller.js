const OrderServices = require("../services/orders-service");

const saveOrder = async (req, res) => {
  const order = req.body;

  try {
    const savedOrder = await OrderServices.saveOrder(order);

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = { saveOrder };
