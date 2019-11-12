const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  addProduct,
  getProductsByCategory,
  getProductById,
} = require('../controllers/product.controller');

router.post('/', auth, asyncWrap(addProduct));
router.get('/', auth, asyncWrap(getProductsByCategory));
router.get('/:product_id', auth, asyncWrap(getProductById));

module.exports = router;
