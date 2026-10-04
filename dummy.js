
    const path = require ('path');
    const fs = require('fs');
    const filePath = path.join(__dirname, '../data/products.json');
    
    module.exports = class Products{
        constructor (id,title,price,description,imgurl){
            this.id=id;
            this.title=title; 
            this.price=price;
            this.description=description;
            this.imgurl=imgurl;
    
    }; 
    save(){
        const p = filePath;
        fs.readFile(p,(err,fileContent)=>{
            
            this.id = Math.random().toString();
            let products = [];
            if (!err){
            products=JSON.parse(fileContent);
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),err=>{
                console.log(err);
            });

            };
           
        });
        
    }
    
    static fetchall(cb){
        const p = filePath ; 
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                cb([]);
            }
            else{
                cb(JSON.parse(fileContent));
            }
        })
    };

     static findById(id, cb) {
        this.fetchall((products) => {
            const product = products.find(p => p.id === id);
                cb(product);
        });
    }
    static editproduct(updatedProduct, cb){
        const p =filePath;
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                cb([]);
            }
            else{
                let products = JSON.parse(fileContent);
                const exsistingindex = products.findIndex(prod => String(prod.id) === String(updatedProduct.id));
                    products[exsistingindex] = updatedProduct;

            fs.writeFile(p, JSON.stringify(products), err =>{
                console.log(err);
            })
            }
        })
       

    };


    static deleteproduct(id) {
        const p =filePath ;
        
        fs.readFile(p,(err,fileContent)=>{
            if(!err){
                let products = JSON.parse(fileContent);
                const product = products.find(prod=> String(prod.id) !== String(id));
                const updatedProducts = products.filter(prod=> String(prod.id) !== String(id) );
                fs.writeFile(p,JSON.stringify(updatedProducts), err =>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        const cart = require('./cart');
                        cart.cartdeleteproduct(id , product.price);

                    }
                    
                });
            }

        });

    
    }
    
    
    
    }



    const cart = require('./cart');
const db = require('../util/database');

module.exports = class Products{
    constructor (id,title,price,description,imgurl){
        this.id=id;
        this.title=title; 
        this.price=price;
        this.description=description;
        this.imgurl=imgurl;

}; 
save() {
    return db.execute( 
        'INSERT INTO products (title, price, description, imgurl) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.description, this.imgurl]
    );
}
static fetchall(){
return db.execute('select * from products');
}

static findById(id){
return db.execute('select * from products where products.id = ?' , [id]);
}

deletebyid(id){

}

}






const path = require('path');
const fs = require('fs');

module.exports = class Cart {
    static addproduct(id, productPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            
            // Safe parsing: only parse if file exists and isn't null
            if (!err && fileContent) {
                try {
                    const parsed = JSON.parse(fileContent);
                    cart.products = parsed.products || [];
                    cart.totalPrice = parsed.totalPrice || 0;
                } catch (parseErr) {
                    console.log('Error parsing cart file, starting new cart:', parseErr);
                }
            }
            
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            
            if (existingProduct) {
                const updatedProduct = { ...existingProduct };
                updatedProduct.quantity = (updatedProduct.quantity || 0) + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                cart.products.push({ id: id, quantity: 1 });
            }
            
            // Ensure totalPrice is a number before adding
            cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
            
            fs.writeFile(filePath, JSON.stringify(cart, null, 2), err => {
                if (err) {
                    console.log('Error saving cart:', err);
                } else {
                    console.log('Cart saved');
                }
            });
        });
    }

    static cartdeleteproduct(id, productPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                console.log('Error reading cart file:', err);
                return;
            }
            
            let cartData;
            try {
                cartData = JSON.parse(fileContent);
            } catch (parseErr) {
                console.log('Could not parse cart file:', parseErr);
                return;
            }

            // Create a mutable copy, ensuring products array exists
            let updatedCart = {
                products: cartData.products || [],
                totalPrice: cartData.totalPrice || 0
            };
            
            const cartItemIndex = updatedCart.products.findIndex(prod => String(prod.id) === String(id));
            
            if (cartItemIndex !== -1) {
                const cartItem = updatedCart.products[cartItemIndex];
                
                // FIX: Use 'quantity' instead of 'qty'
                const productQuantity = cartItem.quantity || 1; 
                
                // Remove the item
                updatedCart.products = updatedCart.products.filter(prod => String(prod.id) !== String(id));
                
                // FIX: Ensure totalPrice is a number before subtracting
                updatedCart.totalPrice = parseFloat(updatedCart.totalPrice) - (parseFloat(productPrice) * productQuantity);

                // Write file
                fs.writeFile(filePath, JSON.stringify(updatedCart, null, 2), err => {
                    if (err) {
                        console.log('Error writing cart file:', err);
                    } else {
                        console.log('Cart updated successfully');
                    }
                });
            } else {
                console.log('Product not found in cart.');
            }
        });
    }
    static fetchallcart (cb){
        fs.readFile(filePath,(err,fileContent)=>{
                    if(err){
                        cb([]);
                    }
                    else{
                        cb(JSON.parse(fileContent));
                    }
                })
    }
};






    Cart.fetchallcart(cart => {
        Products.fetchall(products => {
            const cartproducts = [];

            // Loop through ALL products available in the shop
            for (let product of products) {
                // FIX: Use lowercase 'cart.products' here
                const productData = cart.products.find(prod => String(prod.id) === String(product.id));
                
                if (productData) {
                    cartproducts.push({ 
                        productData: product, 
                        quantity: productData.quantity 
                    });
                }
            }

            // FIX: Pass the data INSIDE the render object with proper syntax
            res.render('shop/cart', {
                prods: cartproducts, 
                pageTitle: 'Your Cart',
                path: '/cart'
            });
        });
    });





    //app.js 


    // Model Associations
Product.belongsTo(User);
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: Cartitem });
Product.belongsToMany(Cart, { through: Cartitem });

sequelize.sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Admin', email: 'admin@test.com' });
        }
        return user;
    })
    .then(user => {
        return user.getCart().then(cart => {
            if (!cart) {
                return user.createCart();
            }
            return cart;
        });
    })
    .then(() => {
        server.listen(3000, () => {
            console.log('🚀 Server running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.log('❌ Error:', err);
    });
