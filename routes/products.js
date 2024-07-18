const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const { getAllproducts, getAllinfoproducts, updateProduct, deleteProduct, createproducts } = require('../controllers/products');
const authMiddleware = require('../middleware/auth');

router.post('/product', createproducts);
//router.put('/product/:id', updateProduct);
router.get('/product', getAllproducts);
//router.delete('/product', deleteProduct);
//router.get('/product',getAllinfoproducts )

module.exports = router;
