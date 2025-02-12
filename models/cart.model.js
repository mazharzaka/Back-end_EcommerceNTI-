const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  cartItem: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      qty: { type: Number, default: 1 },
      totalPrice: Number,
    },
  ],
  totalPriceCart: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
