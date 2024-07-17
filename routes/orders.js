const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');
const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  res.send(orders);
});

router.post('/', authenticateToken, async (req, res) => {
  const cartItems = await Cart.findAll({ where: { userId: req.user.id } });
  if (cartItems.length === 0) return res.status(400).send('Cart is empty');

  let totalAmount = 0;

  for (const item of cartItems) {
    const product = await Product.findByPk(item.productId);
    totalAmount += product.price * item.quantity;
  }

  const order = new Order({
    userId: req.user.id,
    totalAmount: totalAmount,
    shippingAddress: req.body.shippingAddress,
  });

  try {
    const savedOrder = await order.save();
    await Cart.destroy({ where: { userId: req.user.id } });
    res.send(savedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).send('Order not found');
  res.send(order);
});

router.put('/:id', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).send('Order not found');

  order.status = req.body.status;

  try {
    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).send('Order not found');

  try {
    await order.destroy();
    res.send('Order deleted');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
