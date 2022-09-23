const jwt = require('jsonwebtoken');
const fs = require('fs');
const HttpException = require('../shared/http.exception');

require('dotenv').config();

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const verifyToken = (token, _next) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (e) {
    throw new HttpException(401, 'Expired or invalid token');
  }
};

const authenticateToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new HttpException(401, 'Token not found');
  }

  const user = verifyToken(token, next);

  req.user = user;

  next();
};

module.exports = {
  authenticateToken,
};
