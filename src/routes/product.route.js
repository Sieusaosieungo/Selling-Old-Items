const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  addProduct,
  getProductsByCategory,
  getProductById,
  addProductToCart,
} = require('../controllers/product.controller');

router.post('/', auth, asyncWrap(addProduct));
router.get('/', asyncWrap(getProductsByCategory));
router.get('/:product_id', asyncWrap(getProductById));
router.post('/add-to-cart', auth, asyncWrap(addProductToCart));

module.exports = router;
