const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const { authenticateToken } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const categories = await Category.findAll();
  res.send(categories);
});

// routes/categories.js

router.post('/', authenticateToken, isAdmin, createCategory);

// routes/categories.js

router.put('/:id', authenticateToken, isAdmin, updateCategory);


router.post('/', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  const categoryExists = await Category.findOne({ where: { name: req.body.name } });
  if (categoryExists) return res.status(400).send('Category already exists');

  const category = new Category({
    name: req.body.name,
  });

  try {
    const savedCategory = await category.save();
    res.send(savedCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).send('Category not found');

  category.name = req.body.name;

  try {
    const updatedCategory = await category.save();
    res.send(updatedCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
