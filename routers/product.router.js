const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../utili/multerConfig.js');
const { Isadmin, Isuser, authMW } = require('../utili/auth.js');
router.post('/',Isadmin,upload.single('productImage'),productController.createProduct);
router.get('/',authMW,productController.getProducts);
router.post('/one',Isuser,productController.produect);
router.post('/del',Isadmin,productController.deleteProductById);
router.post('/stock',Isadmin,productController.Stock);
router.post('/edit',Isadmin,productController.updateProductById);

module.exports= router;