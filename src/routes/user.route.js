const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  signup,
  signin,
  getAllUser,
} = require('../controllers/user.controller');

router.post('/signup', asyncWrap(signup));
router.post('/signin', asyncWrap(signin));
router.get('/get-list', auth, asyncWrap(getAllUser));

module.exports = router;
