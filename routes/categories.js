const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getAllcategory, storecategory, updatecategory, deletecategory } = require('../controllers/category');
const authMiddleware = require('../middleware/auth');

router.post('/category', storecategory);
router.put('/category/:id', updatecategory);
router.get('/category', getAllcategory);
router.delete('/category', deletecategory);


module.exports = router;
