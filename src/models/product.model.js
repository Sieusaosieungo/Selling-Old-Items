const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
    },
    cost: {
      type: Number,
      require: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
    },
    rating_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rate',
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
