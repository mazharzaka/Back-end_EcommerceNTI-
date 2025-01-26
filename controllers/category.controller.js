const  Category  = require("../models/category.model");

exports.createCategory = async (req, res) => {
    // const{ name } = req.body;
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find({ Isdeleted: false });
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.IsdeletedCategory = async (req, res) => {
    const { data } = req.body;
    try {
        await Category.findByIdAndUpdate(data, { Isdeleted: true }, { new: true });
        res.status(200).json({ deleted: "is deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}