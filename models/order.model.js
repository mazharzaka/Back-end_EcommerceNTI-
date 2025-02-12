const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      qty: Number,
      totalPrice: Number,
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Delivered"],
        default: "Pending",
      },

    },
  ],
  totalPriceOrder: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
