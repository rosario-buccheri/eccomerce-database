const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { authenticateToken } = require('../middleware/auth');
const { getAllorders, storeorders, updateorders, deleteorders } = require('../controllers/orders');

router.post('/orders', storeorders);
router.put('/orders/:id', updateorders);
router.get('/orders', getAllorders);
router.delete('/orders', deleteorders);


module.exports = router;
