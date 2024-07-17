const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const { getAllProducts, storeProduct, updateProduct, deleteProduct } = require('../controllers/products');
const authMiddleware = require('../middleware/auth');

router.post('/product', storeProduct);
router.put('/product/:id', updateProduct);
router.get('/product', getAllProducts);
router.delete('/product', deleteProduct);


module.exports = router;
