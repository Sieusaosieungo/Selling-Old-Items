const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const { signup, signin } = require('../controllers/user.controller');

router.post('/signup', asyncWrap(signup));
router.post('/signin', asyncWrap(signin));

module.exports = router;
