const productModel = require('../models/product.model');

exports.createProduct = async (req, res) => {
    try {
        req.body.imgeURL = req.file.path;
        const product = await productModel.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.deleteProductById = async (req, res) => {
    const { data } = req.body;


    try {
    await productModel.findByIdAndUpdate(data, { Isdeleted: true }, { new: true });

        res.status(200).json({deleted:"is deleted"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.updateProductById = async (req, res) => {
    const { id, name, desc, price, imgeURL } = req.body;

    const updateFields = { name, desc, price, imgeURL };
    // req.body.imgeURL = req.file.path;

  
    const filteredFields = Object.fromEntries(
        Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== '')
    );

    try {

        const product = await productModel.findByIdAndUpdate(id,filteredFields, { new: true });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.produect= async (req,res)=>{
    const { id } = req.body;

    try{
        const product = await productModel.findById(id);
        console.log(product);
        
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({ error: err.message });

    }
}