/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const validator = require('validator');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const uploadMainImage = require('../utils/uploadMainImage');
const { removeAccents } = require('../utils/removeAccents');

async function signup(req, res) {
  if (!validator.isEmail(req.body.email)) {
    throw new Error('Email is invalid');
  }

  const checkExistEmail = await User.findOne({ email: req.body.email });
  if (checkExistEmail) {
    throw new CustomError(errorCode.CONFLICT, 'Email already exist');
  }

  const { full_name, student_id, email } = req.body;
  const fullName = removeAccents(full_name);
  const array = fullName.split(' ');

  let nameEmail = `${array[array.length - 1]}.`;

  array.forEach((arr, id) => {
    if (id !== array.length - 1) {
      nameEmail += arr.charAt(0);
    }
  });

  const studentId = student_id.slice(2, 8);
  const expectedEmail = `${nameEmail.toLowerCase() +
    studentId}@sis.hust.edu.vn`;

  if (expectedEmail !== email) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Hãy nhập tài khoản email nhà trường cung cấp',
    );
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
  const products = await Product.find({ user_id: req.user._id }).lean();
  const productsDetail = await Promise.all(
    products.map(async pdt => {
      let userName = null;
      if (pdt.buyer) {
        const user = await User.findById(pdt.buyer.user_id);

        if (user) {
          userName = user.full_name;
        }
      }

      return { ...pdt, buyer: { ...pdt.buyer, boughtName: userName } };
    }),
  );

  res.send({
    status: 1,
    results: {
      products: productsDetail,
    },
  });
}

async function getUserById(req, res) {
  const { user_id } = req.params;
  const user = await User.findById(user_id);

  res.send({
    status: 1,
    results: {
      user,
    },
  });
}

async function uploadAvatar(req, res) {
  const { avatar } = req.files;
  if (!avatar.name.match(/\.(jpg|png|jpeg)$/)) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Làm ơn upload đúng định dạng ảnh',
    );
  }

  const avatarLink = await uploadMainImage(avatar, '/images/avatar');

  req.user.avatar = avatarLink;

  await req.user.save();
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
  updateInfoUser,
  getProductsOfUser,
  getUserById,
  uploadAvatar,
};
