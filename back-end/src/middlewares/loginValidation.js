const Joi = require('joi');
const HttpException = require('../shared/http.exception');

const loginValidation = (req, res, next) => {
  const infos = req.body;
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });

  const test = loginSchema.validate(infos);
  if (test.error) {
    throw new HttpException(400, test.error.message);
  }

  next();
};

module.exports = loginValidation;