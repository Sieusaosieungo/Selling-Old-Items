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
  getUserById,
  uploadAvatar,
} = require('../controllers/user.controller');

router.post('/signup', asyncWrap(signup));
router.post('/signin', asyncWrap(signin));
router.post('/logout', auth, asyncWrap(logout));
router.post('/logout-all', auth, asyncWrap(logoutAllDevice));
router.get('/', auth, asyncWrap(getInfoUser));
router.patch('/', auth, asyncWrap(updateInfoUser));
router.get('/my-products', auth, asyncWrap(getProductsOfUser));
router.get('/:user_id', auth, asyncWrap(getUserById));
router.patch('/upload-avatar', auth, asyncWrap(uploadAvatar));

module.exports = router;
