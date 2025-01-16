const jwt = require('jsonwebtoken');
const secretKey = "88uQy0J5szV6CZvDK5BiW5Adkj36Pl4uueYtEwR6if0rlvaobN2xjFoqKVqUcdbdurl6ZtDnsbf5e2Qc0XKpzmDrPHOLbO5CZhQd5KKPUg20JDHB2rF7JI3mshXaPAlj";

exports.createAccessToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: '1h' })
}

exports.authMW = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      // console.log(req.user==='user' );

      const verified = jwt.verify(token, secretKey);
      req.user = verified;
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
exports.Isuser = (req, res,next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      req.user.userType === "user" && next();
    }
    else {
      res.status(401).json({ error: 'Access denied, token missing' })
    }

  }
  catch (err) {
    res.status(401).json({ error: err.message })
  }
}
exports.Isadmin = (req, res,next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      req.user.userType === "admin" && next();
    }
    else {
      res.status(401).json({ error: 'Access denied, token missing' })
    }

  }
  catch (err) {
    res.status(401).json({ error: err.message })
  }
}