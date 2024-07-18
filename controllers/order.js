const Order = require('../models/order');
const OrderItem = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const orders = await Order.findAndCountAll({
      where: { userId: req.user.id },
      include: [{ model: OrderItem, include: [Product] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      totalPages: Math.ceil(orders.count / limit),
      currentPage: page,
      orders: orders.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createOrder = async (req, res) => {
  const { shippingAddress } = req.body;

  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id }, include: [Product] });
    
    if (cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.Product.price, 0);

    const order = await Order.create({
      userId: req.user.id,
      shippingAddress,
      totalAmount,
      status: 'Pending'
    });

    const orderItems = cartItems.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.Product.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    await Cart.destroy({ where: { userId: req.user.id } });

    res.status(201).json({ msg: 'Order created successfully', order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
