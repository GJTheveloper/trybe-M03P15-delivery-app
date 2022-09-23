import Joi from 'joi';

const SIX = 6;
const TWELVE = 12;
const loginSchema = Joi.object({
  email: Joi.string().email({ maxDomainSegments: 2, tlds: { allow: false } }).required(),
  password: Joi.string().min(SIX).required(),
  name: Joi.string().min(TWELVE).empty(''),
}).messages({
  'any.required': 'Preencha todos os campos',
  'string.min': 'Sua senha deve conter no mínimo 6 caracteres',
  'string.email': 'Digite um email válido' });

export default loginSchema;
