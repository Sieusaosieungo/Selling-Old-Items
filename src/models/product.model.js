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
    mainImage: {
      type: String,
    },
    attachImages: {
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
    buyer: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      timeBought: {
        type: Date,
      },
    },
    status: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    rates: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        point: {
          type: Number,
        },
        lastUpdated: {
          type: Date,
        },
        _id: false,
      },
    ],
    averagePoint: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
