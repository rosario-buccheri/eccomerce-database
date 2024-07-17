const express = require('express');
const router = express.Router();
const { Cart } = require('../models/cart');
const { Product } = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  const cart = await Cart.findAll({ where: { userId: req.user.id } });
  res.send(cart);
});

router.post('/add/:id', authenticateToken, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Product not found');

  const cartItem = await Cart.findOne({
    where: {
      userId: req.user.id,
      productId: req.params.id,
    },
  });

  if (cartItem) {
    cartItem.quantity += 1;
    await cartItem.save();
  } else {
    await Cart.create({
      userId: req.user.id,
      productId: req.params.id,
      quantity: 1,
    });
  }

  res.send('Product added to cart');
});

router.delete('/remove/:id', authenticateToken, async (req, res) => {
  const cartItem = await Cart.findOne({
    where: {
      userId: req.user.id,
      productId: req.params.id,
    },
  });

  if (!cartItem) return res.status(404).send('Product not found in cart');

  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
    await cartItem.save();
  } else {
    await cartItem.destroy();
  }

  res.send('Product removed from cart');
});

router.delete('/clear', authenticateToken, async (req, res) => {
  await Cart.destroy({ where: { userId: req.user.id } });
  res.send('Cart cleared');
});

module.exports = router;
