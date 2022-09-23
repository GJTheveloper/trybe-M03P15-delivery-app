const User = require('../services/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  const response = await User.login(email, password);

  res.status(200).json(response);
};

const register = async (req, res) => {
  const { name, password, email, role } = req.body;

  const response = await User.register(email, password, name, role);

  res.status(201).json(response);
};

module.exports = { login, register };
