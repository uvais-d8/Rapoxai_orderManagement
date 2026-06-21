const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controller/orderController");

router.post("/", createOrder);

router.patch("/:id", updateOrderStatus);
router.get("/", getOrders);

module.exports = router;