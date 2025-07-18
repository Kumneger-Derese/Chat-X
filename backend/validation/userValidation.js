import Joi from 'joi'

const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': 'Username must be string.',
    'string.empty': 'Username should not be empty.',
    'string.min': `Username must be at least 3 charcters.`,
    'any.required': 'Username is required.'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      'string.base': 'Email must be string.',
      'string.email': 'Email must be valid email.',
      'string.empty': 'Email should not be empty.',
      'any.required': 'Email is required.'
    }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be string.',
    'string.empty': 'Password should not be empty.',
    'string.min': 'Password must be at least 6 charcters.',
    'any.required': 'Password is required.'
  })
})

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      'string.base': 'Email must be string.',
      'string.email': 'Email must be valid email.',
      'string.empty': 'Email should not be empty.',
      'any.required': 'Email is required.'
    }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be string.',
    'string.empty': 'Password should not be empty.',
    'string.min': 'Password must be at least 6 charcters.',
    'any.required': 'Password is required.'
  })
})

const profileSchema = Joi.object({
  username: Joi.string().min(3).allow('').optional().messages({
    'string.base': 'Username must be string.',
    'string.empty': 'Username should not be empty.',
    'string.min': `Username must be at least 3 charcters.`
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .allow('')
    .optional()
    .messages({
      'string.base': 'Email must be string.',
      'string.email': 'Email must be valid email.'
    }),
  password: Joi.string().allow('').min(6).optional().messages({
    'string.base': 'Password must be string.',
    'string.min': 'Password must be at least 6 charcters.',
    'string.empty': 'Password should not be empty.'
  })
})

export { registerSchema, loginSchema, profileSchema }
