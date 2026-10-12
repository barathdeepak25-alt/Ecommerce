const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Place Order
router.post("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of cart.products) {
      const product = await require("../models/Product").findById(
        item.productId
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      totalAmount += product.price * item.quantity;

      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      userId: req.userId,
      products: orderProducts,
      totalAmount,
      status: "Pending",
    });

    // Clear cart after order
    cart.products = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Get user's orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.userId,
    })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;