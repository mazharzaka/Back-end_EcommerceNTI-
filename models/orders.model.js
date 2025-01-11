const mongoose = require('mongoose')
const order = new mongoose.Schema({
    produect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    qty:{
        type:Number,
        required:true,
        min:1
    },
    status:{
        type:Boolean,
        required:true
    },
    received:{
        type:Boolean,
        required:true
    }
})
const Order = mongoose.model('Order', order);

module.exports = Order;