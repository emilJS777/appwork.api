const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required(),
})

const registrationSchema = Joi.object({
    Email: Joi.string().email().required(),
    LastName: Joi.string().alphanum().min(2).max(30).required(),
    FirstName: Joi.string().alphanum().min(2).max(30).required(),
    Password: Joi.string().min(6).max(20).required(),
    ConfirmPassword: Joi.ref('Password'),
})

const refreshTokenSchema = Joi.object({
    RefreshToken: Joi.string().required()
})

module.exports = {
    loginSchema,
    registrationSchema,
    refreshTokenSchema,
}