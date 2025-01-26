const mongoose = require('mongoose')
const category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    Isdeleted: {
        type: Boolean,
        default: false
    }
})
const Category = mongoose.model('Category', category);
module.exports = Category;