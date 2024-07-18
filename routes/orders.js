const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { authenticateToken } = require('../middleware/auth');
const { getOrders, createOrder, deleteorders } = require('../controllers/order');

router.post('/orders', createOrder);
//router.put('/orders/:id', updateorders);
router.get('/orders', getOrders);
//router.delete('/orders', deleteorders);


module.exports = router;
