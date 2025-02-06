const mongoose = require('mongoose')
mongoose.set('strictPopulate', false);

const order = new mongoose.Schema({
  cartItem: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      qty: {
        type: Number,
        default: 1
      },
      totalPrice: Number,
      status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Delivered'],
        default: 'Pending'
      },
  
      Isdeleted: {
        type: Boolean,
        default: false
      },
      CheckOut: {
        type: Boolean,
        default: false},
    }

  ],

  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  totalPriceCart: Number,
  totalPriceOrder: Number
})
const Order = mongoose.model('Order', order);

module.exports = Order;