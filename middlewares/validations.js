const Joi = require('@hapi/joi');


const signupValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email().trim(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		password: Joi.string().min(6).max(32).required(),
	});
	return schema.validate(data);
};


module.exports.signupValidation = signupValidation;