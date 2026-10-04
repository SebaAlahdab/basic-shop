const mongoose = require('mongoose');
const product = require('./products');
const schema = mongoose.Schema;

const userschema = new schema({
   
    email: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productid: {
                type: schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userschema.methods.addtocart = function(product) {
    // Find if product exists in cart
    const cartproductindex = this.cart.items.findIndex(cp => {
        return cp.productid.toString() === product._id.toString();
    });
    
    let newQuantity = 1;
    const updatedcartitem = [...this.cart.items];
    
    if (cartproductindex >= 0) {
        newQuantity = this.cart.items[cartproductindex].quantity + 1;
        updatedcartitem[cartproductindex].quantity = newQuantity;
    } else {
        updatedcartitem.push({
            productid: product._id,
            quantity: newQuantity
        });
    }
    
    this.cart.items = updatedcartitem;
    
    return this.save();
};

userschema.methods.removefromcart = function(productid) {
    const updatedcartitem = this.cart.items.filter(item => {
        return item.productid.toString() !== productid.toString();
    });
    this.cart.items = updatedcartitem;
    this.markModified('cart');
    return this.save();
};

module.exports = mongoose.model('users', userschema);