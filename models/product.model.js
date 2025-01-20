const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgeURL: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    Isdeleted: {
        type: Boolean,
        default: false
    },
    Isstock: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);