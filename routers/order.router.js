const express = require('express');
const orderController = require('../controllers/order.controller');
const { Isuser, Isadmin } = require('../utili/auth')

const Router = express.Router();

Router.post('/check', Isuser, orderController.CheckOut);
Router.post('/Myorders', Isuser, orderController.getMyOrders);
Router.get('/Allorders', Isadmin, orderController.getAllOrders);
Router.post('/status', Isadmin, orderController.updateOrderStatus);
module.exports = Router;