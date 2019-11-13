/* eslint-disable camelcase */
// const CustomError = require('../errors/CustomError');
// const errorCode = require('../errors/errorCode');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const CartDetail = require('../models/cartdetail.model');

async function addProduct(req, res) {
  const product = await Product.create({
    ...req.body,
    user_id: req.user._id,
    status: 'new',
  });

  res.send({
    status: 1,
    results: {
      product,
    },
  });
}

async function getProductsByCategory(req, res) {
  const { category_id } = req.query;
  const products = await Product.find({ category_id });

  res.send({
    status: 1,
    results: {
      products,
    },
  });
}

async function getProductById(req, res) {
  const { product_id } = req.params;
  const product = await Product.findById(product_id);

  res.send({
    status: 1,
    results: {
      product,
    },
  });
}

async function addProductToCart(req, res) {
  const { product_id } = req.body;
  const user_id = req.user._id;

  const product = await Product.findById(product_id);
  const cart = await Cart.findOne({ user_id });

  if (!cart) {
    await Cart.create({ user_id, total_money: product.cost });
  } else {
    cart.total_money += product.cost;

    const cartDetail = await CartDetail.findOne({
      cart_id: cart._id,
      product_id: product._id,
    });

    if (!cartDetail) {
      await CartDetail.create({
        cart_id: cart._id,
        product_id: product._id,
        quantity: 1,
      });
    } else {
      cartDetail.quantity += 1;
    }

    await cart.save();
    await cartDetail.save();
  }

  res.send({
    status: 1,
  });
}

module.exports = {
  addProduct,
  getProductsByCategory,
  getProductById,
  addProductToCart,
};
