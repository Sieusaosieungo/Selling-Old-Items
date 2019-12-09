const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const { getBestProduct } = require('../controllers/topRate.controller');

router.get('/', asyncWrap(getBestProduct));

module.exports = router;
