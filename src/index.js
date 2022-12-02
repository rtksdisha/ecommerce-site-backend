require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//instance of express
const app = express();
const port = 4000;
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

//routes on the server
app.get("/", (req, res) => {
  res.json({ message: "Hello Worlds!" });
});

//gets logic from products.js
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
const connectDB = () => {
  mongoose.connect(process.env.DB_URI);
  console.log("Database Connected");
};

//start a server that takes HTTP requests
app.listen(port, async () => {
  console.log(`Server is running in port ${port}`);
  await connectDB();
});
