require('dotenv').config();
const fs = require('fs');

const jwt = require('jsonwebtoken');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateJWTToken = (payload) =>
  jwt.sign({ data: payload }, secret, jwtConfig);

module.exports = generateJWTToken;
