const bcrypt = require('bcryptjs');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');

async function signup(req, res) {
  const checkExistEmail = await User.findOne({ email: req.body.email });
  if (checkExistEmail) {
    throw new CustomError(errorCode.CONFLICT, 'Email already exist');
  }

  const user = await User.create(req.body);
  const token = await user.generateAuthToken();

  res.send({
    status: 1,
    results: {
      token,
    },
  });
}

async function signin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Đăng nhập thất bại');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Đăng nhập thất bại');
  }

  const token = await user.generateAuthToken();
  res.send({
    status: 1,
    results: {
      token,
    },
  });
}

async function logout(req, res) {
  req.user.tokens = req.user.tokens.filter(({ token }) => token !== req.token);
  await req.user.save();
  res.send({ status: 1 });
}

async function logoutAllDevice(req, res) {
  req.user.tokens = [];
  await req.user.save();
  res.send({ status: 1 });
}

async function getInfoUser(req, res) {
  res.send({
    status: 1,
    results: {
      user: req.user,
    },
  });
}

module.exports = {
  signup,
  signin,
  logout,
  logoutAllDevice,
  getInfoUser,
};
