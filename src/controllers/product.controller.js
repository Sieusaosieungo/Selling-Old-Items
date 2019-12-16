/* eslint-disable camelcase */
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const CartDetail = require('../models/cartdetail.model');
const uploadAttachImages = require('../utils/uploadAttachImage');
const uploadMainImage = require('../utils/uploadMainImage');

async function addProduct(req, res) {
  const { productMainImage, productAttachImages } = req.files;

  if (!productMainImage.name.match(/\.(jpg|png|jpeg)$/)) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Làm ơn upload đúng định dạng ảnh',
    );
  }

  if (!productAttachImages.name.match(/\.(zip)$/)) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Vui lòng upload đúng định dạng .zip',
    );
  }

  const mainImage = await uploadMainImage(
    productMainImage,
    '/images/product/main',
  );

  const attachImages = await uploadAttachImages(
    productAttachImages,
    '/images/product/attach',
  );

  const product = await Product.create({
    ...req.body,
    user_id: req.user._id,
    status: 'new',
    mainImage,
    attachImages,
  });

  res.send({
    status: 1,
    results: {
      product,
    },
  });
}

async function getProductsByCategory(req, res) {
  const { category_id, product_name } = req.query;
  let products;

  if (category_id) {
    products = await Product.find({ category_id, status: 'new' });
  }

  if (product_name) {
    products = await Product.find({
      name: { $regex: product_name, $options: 'i' },
    });
  }

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

  if (product.user_id.toString() === user_id.toString()) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Bạn không thể mua sản phẩm của chính mình',
    );
  }

  const cart = await Cart.findOne({ user_id });

  if (!cart) {
    const newCart = await Cart.create({ user_id, total_money: product.cost });
    await CartDetail.create({
      cart_id: newCart._id,
      product_id,
      quantity: 1,
    });
  } else {
    const cartDetail = await CartDetail.findOne({
      cart_id: cart._id,
      product_id,
    });

    if (!cartDetail) {
      await CartDetail.create({
        cart_id: cart._id,
        product_id,
        quantity: 1,
      });
    } else {
      throw new CustomError(
        errorCode.BAD_REQUEST,
        'Sản phẩm đã có trong giỏ hàng',
      );
    }

    cart.total_money += product.cost;

    await cart.save();
  }

  const cartDetail = await CartDetail.find({ cart_id: cart._id }).lean();

  const cartDetailer = await Promise.all(
    cartDetail.map(async cd => {
      const pd = await Product.findById(cd.product_id);

      return {
        ...cd,
        mainImage: pd.mainImage,
        productName: pd.name,
        productPrice: pd.cost,
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

async function evaluateProduct(req, res) {
  const { product_id, point } = req.body;
  const product = await Product.findById(product_id);

  const evaluatedRateByUser = product.rates.find(
    rate => rate.user_id.toString() === req.user._id.toString(),
  );

  if (!evaluatedRateByUser) {
    product.rates.push({ user_id: req.user, point, lastUpdated: Date.now() });
  } else {
    evaluatedRateByUser.point = point;
    evaluatedRateByUser.lastUpdated = Date.now();
  }

  let totalPoint = 0;
  product.rates.forEach(rate => {
    totalPoint += rate.point;
  });

  product.averagePoint = totalPoint / product.rates.length;

  await product.save();

  res.send({
    status: 1,
    results: {
      product,
    },
  });
}

async function approvedSellProduct(req, res) {
  const { product_id } = req.body;
  const product = await Product.findById(product_id);
  if (product.user_id.toString() !== req.user._id.toString()) {
    throw new CustomError(errorCode.FORBIDDEN);
  }

  if (product.status !== 'pending') {
    throw new CustomError(errorCode.FORBIDDEN);
  }

  product.status = 'sold';

  await product.save();

  const products = await Product.find({ user_id: req.user._id });

  res.send({
    status: 1,
    results: {
      products,
    },
  });
}

async function rejectSellProduct(req, res) {
  const { product_id } = req.body;

  const product = await Product.findById(product_id);
  if (product.user_id.toString() !== req.user._id.toString()) {
    throw new CustomError(errorCode.FORBIDDEN);
  }

  if (product.status !== 'pending') {
    throw new CustomError(errorCode.FORBIDDEN);
  }

  product.status = 'new';
  product.buyer = null;

  await product.save();

  const products = await Product.find({ user_id: req.user._id });

  res.send({
    status: 1,
    results: {
      products,
    },
  });
}

async function addComment(req, res) {
  const { product_id, content, datetime } = req.body;
  const product = await Product.findById(product_id);

  product.comments.push({
    user_id: req.user._id,
    content,
    author: req.user.full_name,
    avatar: req.user.avatar,
    datetime,
  });

  await product.save();

  res.send({
    status: 1,
    results: {
      product,
    },
  });
}

async function deleteProduct(req, res) {
  const { id } = req.body;
  const product = await Product.findById(id);

  if (product.user_id.toString() !== req.user._id.toString()) {
    throw new CustomError(errorCode.FORBIDDEN);
  }
  const cartDetail = await CartDetail.findOne({ product_id: id });

  if (cartDetail) {
    const cart = await Cart.findById(cartDetail.cart_id);
    cart.total_money -= product.cost * cartDetail.quantity;
    await cart.save();
    await cartDetail.remove();
  }

  await product.remove();

  res.send({
    status: 1,
  });
}

module.exports = {
  addProduct,
  getProductsByCategory,
  getProductById,
  addProductToCart,
  evaluateProduct,
  approvedSellProduct,
  rejectSellProduct,
  addComment,
  deleteProduct,
};
