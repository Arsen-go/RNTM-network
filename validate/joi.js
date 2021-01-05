const Joi = require("joi");

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.required(),
    birth: Joi.required(),
    login: Joi.string().alphanum().min(4).required(),
    password: Joi.required(),
    email: Joi.required(),
    gender: Joi.required(),
});

module.exports = schema;
