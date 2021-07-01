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


const signinValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
    	password: Joi.string().min(5).required().trim(),
	});
	return schema.validate(data)
};

const patchUserValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().trim(),
		firstName: Joi.string(),
		lastName: Joi.string(),
		password: Joi.string().min(6).max(32),
	});
	return schema.validate(data);
};

const postProduct = (data) => {
	 const schema = Joi.object({
		name: Joi.string().required().trim(),
		description: Joi.string().trim(),
		image: Joi.string().required().trim(),
		quantity: Joi.string().required().min(1),
		price: Joi.string().required(),
		status:  Joi.string()
	});
	return schema.validate(data)
}



module.exports.signupValidation = signupValidation;
module.exports.signinValidation = signinValidation;
module.exports.patchUserValidation = patchUserValidation;
module.exports.postProduct = postProduct;