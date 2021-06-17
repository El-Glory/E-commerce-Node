const {errorHandler, hashPassword} = require('../middlewares/utils.js');
const User = require('../models/User');
const { signupValidation } =  require('../middlewares/validations.js')
const jwt =  require('jsonwebtoken');

//const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//SIGNUP
exports.Signup = async(req, res , next) => {
	//joi validation
	const {error} = signupValidation(req.body);
	if (error)
      return res.status(400).json({error: error.details[0].message});
	let {firstName, lastName, email, password} = req.body

	try{
		const emailExists = await User.findOne({email});
		if(emailExists){
			return errorHandler(next, "Email already exists", 422)
		}

		const user = new User({firstName, lastName, email, password:hashPassword(password)});
		 await user.save();
		const token = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, {
			expiresIn: '2d'
		});
		res.json({token,user})
	}catch(error){
		return errorHandler(next, error.message);
	}
}


//SIGNIN
exports.Signin = async(req, res, next) => {
	const {error} = signupValidation(req.body);
	if (error)
      return errorHandler(next, 400).json({error: error.details[0].message})
}

