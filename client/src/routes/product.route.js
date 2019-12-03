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
  approvedSellProduct,
  rejectSellProduct,
  addComment,
} = require('../controllers/product.controller');

router.post('/', auth, asyncWrap(addProduct));
router.get('/', asyncWrap(getProductsByCategory));
router.get('/:product_id', asyncWrap(getProductById));
router.post('/add-to-cart', auth, asyncWrap(addProductToCart));
router.patch('/rating', auth, asyncWrap(evaluateProduct));
router.patch('/approved', auth, asyncWrap(approvedSellProduct));
router.patch('/reject', auth, asyncWrap(rejectSellProduct));
router.patch('/add-comment', auth, asyncWrap(addComment));

module.exports = router;
