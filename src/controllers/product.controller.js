/* eslint-disable camelcase */
// const CustomError = require('../errors/CustomError');
// const errorCode = require('../errors/errorCode');
const Product = require('../models/product.model');

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

module.exports = {
  addProduct,
  getProductsByCategory,
  getProductById,
};
