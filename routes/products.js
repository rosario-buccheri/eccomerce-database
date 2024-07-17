const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const { authenticateToken } = require('../middleware/auth');
const { getAllProducts } = require('../controllers/products');
const authMiddleware = require('../middleware/auth');

// Esempio di route protetta
router.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});
// Rotta per ottenere tutti i prodotti, usando authenticateToken come middleware
router.get('/', async (req, res) => {
  try {
      const products = await product.findAll();
      res.send(products);
  } catch (error) {
      res.status(500).send('Errore nel recuperare i prodotti');
  }
});



router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.send(product);
});

router.post('/', async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
  });

  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:id', async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Product not found');

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.categoryId = req.body.categoryId;

  try {
    const updatedProduct = await product.save();
    res.send(updatedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Product not found');

  try {
    await product.destroy();
    res.send('Product deleted');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;