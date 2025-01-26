const categoryController =require('../controllers/category.controller')

const express=require('express')
const {  Isadmin, authMW } = require('../utili/auth')
const Router= express.Router()

Router.post('/',Isadmin,categoryController.createCategory)
Router.get('/',authMW,categoryController.getCategory)

module.exports= Router;