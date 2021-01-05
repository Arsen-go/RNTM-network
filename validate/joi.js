const Joi = require("joi");

const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.required(),
    birth: Joi.required(),
    login: Joi.required(),
    password: Joi.required(),
    email: Joi.required()
});

module.exports = schema;
