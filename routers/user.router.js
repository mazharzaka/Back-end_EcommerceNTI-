const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMW } = require('../utili/auth');

router.post('/',userController.createUser);
router.post('/login',userController.login);
router.get('/',authMW,userController.getUsers);

module.exports= router;