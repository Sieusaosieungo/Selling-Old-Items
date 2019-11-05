const bcrypt = require('bcryptjs');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');

async function signup(req, res) {
  const isExistMail = await User.findOne({ email: req.body.email });
  if (isExistMail) {
    throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, 'Email already exist');
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

async function getAllUser(req, res) {
  const users = await User.find({});

  res.send({
    status: 1,
    results: {
      users,
    },
  });
}

module.exports = {
  signup,
  signin,
  getAllUser,
};
