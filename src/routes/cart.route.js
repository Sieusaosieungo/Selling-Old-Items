const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  getCartByUser,
  deleteProductOnCart,
} = require('../controllers/cart.controller');

router.get('/', auth, asyncWrap(getCartByUser));
router.delete('/delete-product', auth, asyncWrap(deleteProductOnCart));

module.exports = router;
