const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const { getAllproducts, getProductDetails, updateProduct, deleteProduct, createproducts } = require('../controllers/products');
const authMiddleware = require('../middleware/auth');

router.post('/product',authMiddleware, createproducts);
//router.put('/product/:id', updateProduct);
router.get('/product',authMiddleware, getAllproducts);
router.get('/product/:id',authMiddleware, getProductDetails);
//router.delete('/product', deleteProduct);
//router.get('/product',getAllinfoproducts )

module.exports = router;
