const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  addProduct,
  getProductsByCategory,
} = require('../controllers/product.controller');

router.post('/', auth, asyncWrap(addProduct));
router.get('/', auth, asyncWrap(getProductsByCategory));

module.exports = router;
