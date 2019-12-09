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
        mainImage: product.mainImage,
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

// async function increaseProductToCart(req, res) {
//   const { product_id } = req.body;
//   const cart = await Cart.findOne({ user_id: req.user._id });
//   const product = await Product.findById(product_id);
//   const cartDetail = await CartDetail.findOne({
//     cart_id: cart._id,
//     product_id,
//   });

//   cartDetail.quantity += 1;
//   await cartDetail.save();

//   cart.total_money += product.cost;
//   await cart.save();

//   res.send({
//     status: 1,
//     results: {
//       quantity: cartDetail.quantity,
//     },
//   });
// }

// async function decreaseProductToCart(req, res) {
//   const { product_id } = req.body;
//   const cart = await Cart.findOne({ user_id: req.user._id });
//   const product = await Product.findById(product_id);
//   const cartDetail = await CartDetail.findOne({
//     cart_id: cart._id,
//     product_id,
//   });

//   cartDetail.quantity -= 1;
//   await cartDetail.save();

//   cart.total_money -= product.cost;
//   await cart.save();

//   res.send({
//     status: 1,
//     results: {
//       quantity: cartDetail.quantity,
//     },
//   });
// }

async function deleteProductOnCart(req, res) {
  const { product_id } = req.body;
  const cart = await Cart.findOne({ user_id: req.user._id });
  const product = await Product.findById(product_id);
  const cartDetail = await CartDetail.findOne({
    cart_id: cart._id,
    product_id,
  });

  cart.total_money -= cartDetail.quantity * product.cost;
  await CartDetail.findByIdAndDelete(cartDetail._id);
  await cart.save();

  const cartDetails = await CartDetail.find({ cart_id: cart._id }).lean();
  const cartDetailer = await Promise.all(
    cartDetails.map(async cd => {
      const productObject = await Product.findById(cd.product_id);

      return {
        ...cd,
        productImages: productObject.images,
        productName: productObject.name,
        productPrice: productObject.cost,
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

async function pay(req, res) {
  const cart = await Cart.findOne({ user_id: req.user._id });
  const listCartDetail = await CartDetail.find({
    cart_id: cart._id,
  });

  await Promise.all(
    listCartDetail.map(async cartDetail => {
      const product = await Product.findById(cartDetail.product_id);

      product.status = 'pending';
      product.buyer.user_id = req.user._id;

      product.buyer.timeBought = Date.now();
      await product.save();
    }),
  );

  await CartDetail.deleteMany({ cart_id: cart._id });
  await Cart.deleteOne({ user_id: req.user._id });

  res.send({
    status: 1,
  });
}

module.exports = {
  getCartByUser,
  deleteProductOnCart,
  pay,
};
