const jwt = require('jsonwebtoken');
const { User } = require('../dataBase/dataBase');
require('dotenv').config({path: './config/.env'})


module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie('jwt', '', {maxAge: 1})
        next()
      } else {
        let user = await User.findByPk(decodedToken.userId)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null;
    next()
  }
};

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if(err) {
        console.log(err);
        res.status(200).send({"result": false, "message":"no token"})
      } else {
        res.decodedToken = decodedToken;
        next()
      }
    })
  } else {
    res.status(200).send({"result": false, "message":"no token"})
    
  }
};
