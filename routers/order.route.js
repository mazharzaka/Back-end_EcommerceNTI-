const orderController =require('../controllers/order.controller')
const express=require('express')
const Router= express.Router()

Router.post('/',orderController.addorder)
Router.post('/del',orderController.deleteOrderById)
Router.post('/cart',orderController.getcart)
Router.post('/update',orderController.updateOrderById)
Router.post('/received',orderController.received)
Router.get('/admin',orderController.getadmin)

module.exports= Router;