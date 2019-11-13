const mongoose = require('mongoose');

const CartDetailSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const CartDetailMode = mongoose.model('CartDetail', CartDetailSchema);

module.exports = CartDetailMode;
