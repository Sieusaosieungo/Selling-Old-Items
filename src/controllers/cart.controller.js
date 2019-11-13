// const CustomError = require('../errors/CustomError');
// const errorCode = require('../errors/errorCode');
const Cart = require('../models/cart.model');
const CartDetail = require('../models/cartdetail.model');

async function getCartByUser(req, res) {
  const cart = await Cart.findOne({ user_id: req.user._id });
  const cartDetail = await CartDetail.find({ cart_id: cart._id });

  res.send({
    status: 1,
    results: {
      cart: {
        ...cartDetail,
        total_money: cart.total_money,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
      },
    },
  });
}

module.exports = {
  getCartByUser,
};
