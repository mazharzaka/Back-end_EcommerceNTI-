const jwt = require('jsonwebtoken');
const secretKey = "88uQy0J5szV6CZvDK5BiW5Adkj36Pl4uueYtEwR6if0rlvaobN2xjFoqKVqUcdbdurl6ZtDnsbf5e2Qc0XKpzmDrPHOLbO5CZhQd5KKPUg20JDHB2rF7JI3mshXaPAlj";
const userModel = require('../models/user.model');

exports.createAccessToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: '1h' })
}

exports.authMW = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      console.log(req.user.userId );
      next();
    }
    else {
      res.status(401).json({ error: 'Access denied, token missing' })
    }
  }
  catch (err) {
    res.status(401).json({ error: err.message })
  }
}
exports.Isuser =async (req, res,next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
     
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      const user =await userModel.findById(req.user.userId).populate("userType")
      console.log(user);
      // console.log(req.user);
      if (user) {
        user.userType.desc === "user" ?next():res.status(404).json({ error:'is not user' });
      }else{
        return res.status(404).json({ error: 'User not found' });

      }
    }
    else {
      res.status(401).json({ error: 'Access denied, token missing' })
    }

  }
  catch (err) {
    res.status(401).json({ error: err.message })
  }
}
exports.Isadmin =async (req, res,next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
     
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      const user =await userModel.findById(req.user.userId).populate("userType")
      console.log(user);
      // console.log(req.user);
      if (user) {
        user.userType.desc === "admin" ?next():res.status(404).json({ error:'is not admin' });
      }else{
        return res.status(404).json({ error: 'User not found' });

      }
    }
    else {
      res.status(401).json({ error: 'Access denied, token missing' })
    }

  }
  catch (err) {
    res.status(401).json({ error: err.message })
  }
}