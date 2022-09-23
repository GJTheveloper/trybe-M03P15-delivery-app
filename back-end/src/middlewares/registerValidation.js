const Joi = require('joi');
const HttpException = require('../shared/http.exception');

const registerValidation = (req, res, next) => {
  const infos = req.body;
  const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    role: Joi.string().min(3),
  });

  const test = registerSchema.validate(infos);
  if (test.error) {
    throw new HttpException(400, test.error.message);
  }

  next();
};

module.exports = registerValidation;