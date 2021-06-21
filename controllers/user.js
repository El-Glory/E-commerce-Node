const {errorHandler, hashPassword} = require('../middlewares/utils.js');
const User = require('../models/User');
const { signupValidation, signinValidation, patchUserValidation} =  require('../middlewares/validations.js');
const jwt =  require('jsonwebtoken');
const bcrypt =  require('bcrypt');

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
	const {error} = signinValidation(req.body);
	if (error)
      return res.status(400).json({error: error.details[0].message})

  let {email, password} = req.body;

  try{
  	const user = await User.findOne({email}).populate("cart.items.product");
  	if(!user){
  		return errorHandler(next,"Email doesn't exist", 422)
  	}
  	const validPass = await bcrypt.compare(req.body.password, user.password);
  	if(!validPass) return errorHandler(next,"Wrong Password", 422)

  	const token = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, {
  		expiresIn:'2d'
  		
  	})
    //const { firstName, lastName, email, id } = user;
  		res.json({user})
  }catch(error){
  	return errorHandler(next, error.message);
  }
};

exports.getIsLoggedIn = async(req, res , next) => {
	try{
		const user = await await User.findById(req.userId).populate("cart.items.length");
		if(!user) return errorHandler(next,"No user found")
			res.json({user})
	}catch(error){
		 return errorHandler(next, error.message)
	}
}


exports.patchUser =  async(req, res , next) => {
	const {error} = patchUserValidation(req.body)
	if (error)
      return res.status(400).json({error: error.details[0].message})

    let {firstName, lastName, email, password} =  req.body

    try{
	    const emailExists = await User.findOne({ email });
	    if (emailExists && emailExists._id != req.userId) {
	      return errorHandler(next, "Email doesn't exists!", 422);
	    }

	    const user = await User.findById(req.userId)
	    user.firstName = firstName;
	    user.lastName = lastName;
	    user.email = email;
	    user.password = password;

	    let newUser = user.save();
	    newUser = await User.populate(newUser, { path: "cart.items.product" });
	    res.json({ user: newUser });
    }catch(error){
    	return errorHandler(next, error.message);
    }
    
}

