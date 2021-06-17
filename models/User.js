const mongoose = require('mongoose');
const Product = require('./Product.js');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
	firstName : {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
	    type: String,
	    required: true,
  },
  	password:{
	  	type: String,
	  	reqired: true,
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
  }
})


module.exports = mongoose.model("User", userSchema)