const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  addProduct,
  getProductsByCategory,
  getProductById,
  addProductToCart,
  evaluateProduct,
} = require('../controllers/product.controller');

router.post('/', auth, asyncWrap(addProduct));
router.get('/', asyncWrap(getProductsByCategory));
router.get('/:product_id', asyncWrap(getProductById));
router.post('/add-to-cart', auth, asyncWrap(addProductToCart));
router.patch('/rating', auth, asyncWrap(evaluateProduct));

module.exports = router;
