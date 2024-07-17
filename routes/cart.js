const express = require('express');
const router = express.Router();
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { getAllcart, storecart, updatecart, deletecart } = require('../controllers/cart');
const { authenticateToken } = require('../middleware/auth');


router.post('/cart', storecart);
router.put('/cart/:id', updatecart);
router.get('/cart', getAllcart);
router.delete('/cart', deletecart);


module.exports = router;
