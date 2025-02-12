const CartController =require('../controllers/cart.controller')
const express=require('express')
const { Isuser } = require('../utili/auth')
const Router= express.Router()

Router.post('/',Isuser,CartController.addorder)
Router.post('/del',Isuser,CartController.deleteOrderById)
Router.post('/cart',Isuser,CartController.getcart)
Router.post('/qty',Isuser,CartController.qty)


module.exports= Router;