const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const Category = require('../models/category.model');

async function addCategory(req, res) {
  const checkExistCategory = await Category.findOne({ name: req.body.name });
  if (checkExistCategory) {
    throw new CustomError(errorCode.CONFLICT, 'Category already exist');
  }

  const category = await Category.create(req.body);

  res.send({
    status: 1,
    results: {
      category,
    },
  });
}

async function getListCategory(req, res) {
  const categories = await Category.find({});

  res.send({
    status: 1,
    results: {
      categories,
    },
  });
}

module.exports = {
  addCategory,
  getListCategory,
};
