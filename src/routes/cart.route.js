const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const { getCartByUser } = require('../controllers/cart.controller');

router.get('/', auth, asyncWrap(getCartByUser));

module.exports = router;
