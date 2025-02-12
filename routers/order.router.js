const express = require('express');
const orderController = require('../controllers/order.controller');
const { Isuser } = require('../utili/auth')

const Router = express.Router();

Router.post('/check', Isuser, orderController.CheckOut);
Router.post('/Myorders', Isuser, orderController.getMyOrders);
module.exports = Router;