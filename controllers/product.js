const {errorHandler} = require('../middlewares//utils.js');
const Product = require('../models/Product.js');
const Category = require('../models/category.js');

exports.postProduct = async(req, res, next) => {
	let {
		name,
		description,
		image,
		category,
		quantity,
		price,
		status
	}
}