const md5 = require('md5');
const { Users } = require('../database/models');
const generateJWTToken = require('../utils/jwt');
const HttpException = require('../shared/http.exception');

const login = async (email, pass) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) throw new HttpException(404, 'Usuario nao encontrado');

  const { name, password, id, role } = user;

  const cryptPassword = md5(pass);

  if (cryptPassword !== password) {
    throw new HttpException(400, 'Senha inválida!');
  }

  const json = { name, email, id, role };

  const token = generateJWTToken(json);

  return { token, name, email, id, role };
};

const register = async (email, pass, name, role = 'customer') => {
  const user = await Users.findOne({ where: { email } });
  if (user) {
    throw new HttpException(409, 'Usuario ja existe!');
  }

  const cryptPassword = md5(pass);
  const { id } = await Users.create({
    email,
    name,
    password: cryptPassword,
    role,
  });

  const json = { name, email, id, role };

  const token = generateJWTToken(json);

  return { token, name, email, id, role };
};

module.exports = { login, register };
