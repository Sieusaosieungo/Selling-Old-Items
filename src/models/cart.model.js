const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    total_money: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const cartModel = mongoose.model('Cart', CartSchema);

module.exports = cartModel;
