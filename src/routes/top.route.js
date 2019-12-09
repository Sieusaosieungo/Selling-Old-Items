const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const {
  getBestProduct,
  getNewestProduct,
} = require('../controllers/top.controller');

router.get('/rate', asyncWrap(getBestProduct));
router.get('/newest', asyncWrap(getNewestProduct));

module.exports = router;
