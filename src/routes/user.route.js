const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  signup,
  signin,
  logout,
  logoutAllDevice,
  getInfoUser,
  updateInfoUser,
  getProductsOfUser,
} = require('../controllers/user.controller');

router.post('/signup', asyncWrap(signup));
router.post('/signin', asyncWrap(signin));
router.post('/logout', auth, asyncWrap(logout));
router.post('/logout-all', auth, asyncWrap(logoutAllDevice));
router.get('/', auth, asyncWrap(getInfoUser));
router.patch('/', auth, asyncWrap(updateInfoUser));
router.get('/my-products', auth, asyncWrap(getProductsOfUser));

module.exports = router;
