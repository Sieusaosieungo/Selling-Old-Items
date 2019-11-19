/* eslint-disable camelcase */
// const CustomError = require('../errors/CustomError');
// const errorCode = require('../errors/errorCode');
const Cart = require('../models/cart.model');
const CartDetail = require('../models/cartdetail.model');
const Product = require('../models/product.model');

async function getCartByUser(req, res) {
  const cart = await Cart.findOne({ user_id: req.user._id });
  const cartDetail = await CartDetail.find({ cart_id: cart._id }).lean();

  const cartDetailer = await Promise.all(
    cartDetail.map(async cd => {
      const product = await Product.findById(cd.product_id);

      return {
        ...cd,
        productImages: product.images,
        productName: product.name,
        productPrice: product.cost,
      };
    }),
  );

  res.send({
    status: 1,
    results: {
      listItems: [...cartDetailer],
      total_money: cart.total_money,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    },
  });
}

async function increaseProductToCart(req, res) {
  const { product_id } = req.body;
  const cart = await Cart.findOne({ user_id: req.user._id });
  const cartDetail = await CartDetail.findOne({
    cart_id: cart._id,
    product_id,
  });

  cartDetail.quantity += 1;
  await cartDetail.save();

  res.send({
    status: 1,
    results: {
      quantity: cartDetail.quantity,
    },
  });
}

async function decreaseProductToCart(req, res) {
  const { product_id } = req.body;
  const cart = await Cart.findOne({ user_id: req.user._id });
  const cartDetail = await CartDetail.findOne({
    cart_id: cart._id,
    product_id,
  });

  cartDetail.quantity -= 1;
  await cartDetail.save();

  res.send({
    status: 1,
    results: {
      quantity: cartDetail.quantity,
    },
  });
}

async function deleteProductOnCart(req, res) {
  const { product_id } = req.body;
  const cart = await Cart.findOne({ user_id: req.user._id });
  const cartDetail = await CartDetail.findOneAndDelete({
    cart_id: cart._id,
    product_id,
  });

  res.send({
    status: 1,
    results: {
      id: cartDetail.product_id,
    },
  });
}

module.exports = {
  getCartByUser,
  increaseProductToCart,
  decreaseProductToCart,
  deleteProductOnCart,
};
