/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const validator = require('validator');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Product = require('../models/product.model');

async function signup(req, res) {
  if (!validator.isEmail(req.body.email)) {
    throw new Error('Email is invalid');
  }

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

async function updateInfoUser(req, res) {
  if (req.body.email || req.body.student_id) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Bạn không thể thay đổi email hoặc MSSV',
    );
  }

  const {
    full_name,
    gender,
    oldPassword,
    newPassword,
    phone,
    address,
  } = req.body;

  if (oldPassword && newPassword) {
    const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    if (!isMatch) {
      throw new CustomError(
        errorCode.FORBIDDEN,
        'You enter password incorrect',
      );
    }

    if (oldPassword === newPassword) {
      throw new CustomError(
        errorCode.BAD_REQUEST,
        'You enter new password to match to old password',
      );
    }

    req.user.password = newPassword;
  }

  req.user.full_name = full_name;
  req.user.gender = gender;
  req.user.address = address;
  req.user.phone = phone;

  await req.user.save();

  res.send({
    status: 1,
    results: {
      user: req.user,
    },
  });
}

async function getProductsOfUser(req, res) {
  const products = await Product.find({ user_id: req.user._id });
  const productsDetail = await Promise.all(
    products.map(async pdt => {
      const user = await User.findById(pdt.buyer.user_id);
      let userName = null;
      if (user) {
        userName = user.full_name;
      }
      return { ...pdt.lean(), buyer: { ...pdt.buyer, boughtName: userName } };
    }),
  );

  res.send({
    status: 1,
    results: {
      products: productsDetail,
    },
  });
}

module.exports = {
  signup,
  signin,
  logout,
  logoutAllDevice,
  getInfoUser,
  updateInfoUser,
  getProductsOfUser,
};
