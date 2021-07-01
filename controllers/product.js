const {errorHandler} = require('../middlewares//utils.js');
const {postProduct} =  require('../middlewares/validations.js')
const Product = require('../models/Product.js');
const Category = require('../models/category.js');

exports.postProduct = async(req, res, next) => {
	const {error} = postProduct(req.body);
	if (error)
      return res.status(400).json({error: error.details[0].message});
  try{
	let {
		name,
		description,
		image,
		category,
		quantity,
		price,
		status
	} = req.body ;

	 let product = new Product({
      name,
      description,
      image,
      category,
      quantity,
      price,
      status,
    });
    await product.save();
    product = await Product.populate(product, { path: "category" });
    res.json({ product });
  } catch (error) {
    errorHandler(next, error.message);
  }
}