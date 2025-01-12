const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../utili/multerConfig.js');
router.post('/',upload.single('productImage'),productController.createProduct);
router.get('/',productController.getProducts);
router.post('/one',productController.produect);
router.post('/del',productController.deleteProductById);
router.post('/edit',productController.updateProductById);

module.exports= router;