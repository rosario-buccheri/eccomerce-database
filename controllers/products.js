// controllers/categories.js

const products = require('../models/products');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await products.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// controllers/categories.js

exports.createProducts = async (req, res) => {
    const { name } = req.body;
  
    try {
      // Check if category already exists
      let products = await products.findOne({ where: { name } });
      if (products) {
        return res.status(400).json({ msg: 'Products already exists' });
      }
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
}
};