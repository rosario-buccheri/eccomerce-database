const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, updateCategory } = require('../controllers/categories');
//const { authenticateToken } = require('../middleware/auth');

// Route to create a category
router.post('/category', createCategory);

// Route to update a category
router.put('/category/:id', updateCategory);

// Route to get all categories
router.get('/category', getAllCategories);

module.exports = router;
