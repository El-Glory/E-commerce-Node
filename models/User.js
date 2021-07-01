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

userSchema.methods.addToCart = async (productId) => {
  const product = await Product.findById(productId);

  if(!product.quantity){
    throw new Error("Out of stock")
  }

  let items = [...this.cart.items];
  const index = items.findIndex((item) => item.product == productId)

  if(index === -1){
    items = [{product: productId, quantity: 1}, ...items];
  }else{
    items[index].quantity++;
    if(items[index].quantity > product.quantity){
       throw new Error(
        `Out of stock! Only ${product.quantity} available in stock!`
      );
    }
  }

  //Increasing the price
  this.cart.price += product.price;
  this.cart.items = [...items];
  const user = await this.save();
  return user;
}

userSchema.methods.decrementFromCart = async(productId) =>{
  let items = [...this.cart.items];
  const index = items.findIndex((item) => item.product == productId);

  //Qunatity cannot be zero
  if(items[index].quantity === 1) return this
    items[index].quantity--;
    const product = await Product.findById(productId);
    // Decrease price
    this.cart.price -= product.price
    this.cart.items = [...items];
    const user = await this.save();
    return user
}

userSchema.methods.deleteFromCart = async function (productId) {
  let items = [...this.cart.items];
  const index = items.findIndex((item) => item.product == productId);

  const product = await Product.findById(productId);
  this.cart.price -= product.price * items[index].quantity;
  items = items.filter((item) => item.product != productId);
  this.cart.items = [...items];
  const user = await this.save();
  return user;
};

userSchema.methods.emptyCart = async function () {
  this.cart.items = [];
  this.cart.price = 0;
  const user = await this.save();
  return user;
};


module.exports = mongoose.model("User", userSchema)