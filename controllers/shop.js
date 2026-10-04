const Products = require('../modules/products');
const User = require('../modules/users');

exports.getproducts = (req, res, next) => {
    Products.find()
        .then(products => {
            res.render('shop/product-list', { prods: products });
        })
        .catch(err => {
            console.log(err);
            res.render('shop/product-list', { prods: [] });
        });
};

exports.getindex = (req, res, next) => {
    Products.find()
        .then(products => {
            res.render('shop/index', { prods: products });
        })
        .catch(err => {
            console.log(err);
            res.render('shop/index', { prods: [] });
        });
};

exports.getdetails = (req, res, next) => {
    const id = req.params.productid;
    
    Products.findById(id)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('shop/product-detail', { product: product });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};
exports.postcart = (req, res, next) => {
    const prodId = req.body.productid;   
    const userId = req.session.user._id;
    
    User.findById(userId)
        .then(user => {
            if (!user) {
                console.log('❌ User not found');
                return res.redirect('/log-in');
            }
            return Products.findById(prodId)
                .then(product => {
                    if (!product) {
                        console.log('❌ Product not found');
                        return res.redirect('/');
                    }
                    return user.addtocart(product);
                });
        })
        .then(() => {
            console.log('✅ Product added to cart');
            res.redirect('/cart');
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.redirect('/');
        });
};

exports.getcart = (req, res, next) => {
    const userId = req.session.user._id;
    
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.render('shop/cart', {
                    prods: [],
                    totalPrice: 0,
                    path: '/cart',
                    title: 'Your Cart'
                });
            }
            
            const cartItems = user.cart.items;
            
            if (!cartItems || cartItems.length === 0) {
                return res.render('shop/cart', {
                    prods: [],
                    totalPrice: 0,
                    path: '/cart',
                    title: 'Your Cart'
                });
            }
            
            const productIds = cartItems.map(item => item.productid);
            
            return Products.find({ '_id': { $in: productIds } })
                .then(products => {
                    const cartProducts = cartItems.map(cartItem => {
                        const product = products.find(p => 
                            p._id.toString() === cartItem.productid.toString()
                        );
                        
                        return {
                            product: product,
                            quantity: cartItem.quantity
                        };
                    }).filter(item => item.product != null);
                    
                    let totalPrice = 0;
                    cartProducts.forEach(item => {
                        totalPrice += item.product.price * item.quantity;
                    });
                    
                    res.render('shop/cart', {
                        prods: cartProducts,
                        totalPrice: totalPrice,
                        path: '/cart',
                        title: 'Your Cart'
                    });
                });
        })
        .catch(err => {
            console.log('❌ Error fetching cart:', err);
            res.render('shop/cart', {
                prods: [],
                totalPrice: 0,
                path: '/cart',
                title: 'Your Cart'
            });
        });
};

exports.delete = (req, res, next) => {
    const prodId = req.body.productid;
    const userId = req.session.user._id;
    
    User.findById(userId)
        .then(user => {
            if (!user) {
                console.log('❌ User not found');
                return res.redirect('/cart');
            }
            return user.removefromcart(prodId);
        })
        .then(() => {
            console.log('✅ Product removed from cart');
            res.redirect('/cart');
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.redirect('/cart');
        });
};