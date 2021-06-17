const bcrypt = require('bcrypt')

exports.errorHandler = (next, message, status = 500) => {
	const error = new Error(message);
	error.status = status;
	next(error);
};

exports.hashPassword =(password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  };