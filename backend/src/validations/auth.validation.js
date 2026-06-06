import Joi from 'joi';

export const oauthCallbackSchema = Joi.object({
  code: Joi.string().required().messages({
    'any.required': 'Google authorization code is required',
    'string.empty': 'Google authorization code must not be empty',
  }),
});

export const authHeaderSchema = Joi.object({
  authorization: Joi.string().required().messages({
    'any.required': 'Authorization header is required',
    'string.empty': 'Authorization header must not be empty',
  }),
}).unknown(true);
