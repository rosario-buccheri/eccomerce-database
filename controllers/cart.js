const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({ include: Product });
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    let cartItem = await Cart.findOne({ where: { productId: id } });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      await Cart.create({ productId: id, userId: 1, quantity: 1 });
    }

    res.status(200).json({ msg: 'Product added to cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findOne({ where: { productId: id } });

    if (!cartItem) {
      return res.status(404).json({ msg: 'Product not found in cart' });
    }

    await cartItem.destroy();
    res.status(200).json({ msg: 'Product removed from cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.destroy({ where: {}, truncate: true });
    res.status(200).json({ msg: 'Cart cleared' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
