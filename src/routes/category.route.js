const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  addCategory,
  getListCategory,
} = require('../controllers/category.controller');

router.post('/', auth, asyncWrap(addCategory));
router.get('/', auth, asyncWrap(getListCategory));

module.exports = router;
