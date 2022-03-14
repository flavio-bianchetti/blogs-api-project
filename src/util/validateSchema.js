const Joi = require('joi');

const validateUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validateEmailAndPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const validateNameSchema = Joi.object({
  name: Joi.string().required(),
});

const validateIdParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const validateTitleContentAndCategoryIdsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  userId: Joi.number().integer().required(),
  categoryIds: Joi.array().items(Joi.number().integer().required()).required(),
});

module.exports = {
  validateUserSchema,
  validateEmailAndPasswordSchema,
  validateNameSchema,
  validateTitleContentAndCategoryIdsSchema,
  validateIdParamsSchema,
};
