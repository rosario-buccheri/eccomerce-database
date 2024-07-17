// controllers/categories.js

const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// controllers/categories.js

exports.createCategory = async (req, res) => {
    const { name } = req.body;
  
    try {
      // Check if category already exists
      let category = await Category.findOne({ where: { name } });
      if (category) {
        return res.status(400).json({ msg: 'Category already exists' });
      }
  
      // Create new category
      category = await Category.create({ name });
  
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  // controllers/categories.js

exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
  
    try {
      let category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }
  
      // Update category
      category.name = name;
      await category.save();
  
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  