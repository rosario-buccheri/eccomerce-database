const express = require('express');
const router = express.Router();
const { cart } = require('../models/cart');
const { Product } = require('../models/product');
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cart');
const  authMiddleware  = require('../middleware/auth');


router.post('/cart-add', authMiddleware, addToCart);
router.post('/cart-remove',authMiddleware ,removeFromCart)
//router.put('/cart/:id', updatecart);
router.get('/cart',authMiddleware, getCart);
router.delete('/cart',authMiddleware, clearCart);


module.exports = router;
