const Order = require("../model/orderModel");

const createOrder = async (req, res) => {
  const { customerName, items } = req.body;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    customerName,
    items,
    totalAmount,
  });

  res.status(201).json(order);
};

const getOrders = async (req, res) => {
  const orders = await Order.find()
 .sort({ createdAt: -1 });
  res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updatedOrder);
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};