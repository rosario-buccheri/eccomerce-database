const express = require('express');
const router = express.Router();
const { cart } = require('../models/cart');
const { Product } = require('../models/product');
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cart');
const { authenticateToken } = require('../middleware/auth');


router.post('/cart-add', addToCart);
router.post('/cart-remove', removeFromCart)
//router.put('/cart/:id', updatecart);
router.get('/cart', getCart);
router.delete('/cart', clearCart);


module.exports = router;
