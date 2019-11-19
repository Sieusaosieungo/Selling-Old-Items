const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  getCartByUser,
  increaseProductToCart,
  decreaseProductToCart,
  deleteProductOnCart,
} = require('../controllers/cart.controller');

router.get('/', auth, asyncWrap(getCartByUser));
router.patch('/increase-product', auth, asyncWrap(increaseProductToCart));
router.patch('/decrease-product', auth, asyncWrap(decreaseProductToCart));
router.delete('/delete-product', auth, asyncWrap(deleteProductOnCart));

module.exports = router;
