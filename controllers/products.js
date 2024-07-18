// controllers/categories.js

const Product = require('../models/product');

exports.getProductDetails = async (req, res) => {
  try {
    const productDetails = await Product.findOne({where: {idProducts: req.params.id}});
    res.status(200).json(productDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllproducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createproducts = async (req, res) => {
    const { name } = req.body;
    try {
      // Check if category already exists
      let product = await Product.findOne({ where: { name } });
      if (product) {
        return res.status(400).json({ msg: 'Products already exists' });
      } else {
         product = await Product.create(req.body);
         if (product) {
          res.status(200).json({ msg: 'Product created successful' });
         } else {
          res.status(400).json({ msg: 'Error creating product' });
         }
      }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
}
};