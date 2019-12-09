const Product = require('../models/product.model');

async function getBestProduct(req, res) {
  const { number } = req.query;
  const numberConvertToInt = parseInt(number, 10);
  const products = await Product.find()
    .sort({ averagePoint: -1 })
    .limit(numberConvertToInt);
  res.send({
    status: 1,
    results: {
      products,
    },
  });
}

async function getNewestProduct(req, res) {
  const { number } = req.query;
  const numberConvertToInt = parseInt(number, 10);
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .limit(numberConvertToInt);
  res.send({
    status: 1,
    results: {
      products,
    },
  });
}
module.exports = {
  getBestProduct,
  getNewestProduct,
};
