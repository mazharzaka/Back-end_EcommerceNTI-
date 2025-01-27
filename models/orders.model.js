const mongoose = require('mongoose')
mongoose.set('strictPopulate', false);

const order = new mongoose.Schema({
    cartItem:[
        {
          productId:{ type: mongoose.Schema.Types.ObjectId, ref : "product"},
          qty:{
            type:Number,
            default:1
          },
          totalPrice:Number,
        }
      ],
  
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    totalPriceCart:Number,
    status:{
        type:Boolean,
        required:true
    },
    received:{
        type:Boolean,
        required:true

    },
    Isdeleted: {
        type: Boolean,
        default: false
    }
})
const Order = mongoose.model('Order', order);

module.exports = Order;