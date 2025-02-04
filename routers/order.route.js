const orderController =require('../controllers/order.controller')
const express=require('express')
const { Isuser, Isadmin } = require('../utili/auth')
const Router= express.Router()

Router.post('/',Isuser,orderController.addorder)
Router.post('/del',Isuser,orderController.deleteOrderById)
Router.post('/cart',Isuser,orderController.getcart)
Router.post('/Myorders',Isuser,orderController.getMyoreders)
Router.post('/check',Isuser,orderController.checkOut)
Router.post('/qty',Isuser,orderController.qty)
Router.post('/update',Isadmin,orderController.updateOrderstatus)
// Router.post('/received',Isadmin,orderController.received)
Router.get('/admin',Isadmin,orderController.getadmin)

module.exports= Router;