const Product = require('../modules/products');
const db = require('../util/database');

// ✅ GET - Add Product Form
exports.getaddproducucts = (req, res, next) => {
    res.render('admin/add-product' ,{
    isauthenticated:req.session.logedin
    ,csrftoken: req.csrfToken()

    });
};

// ✅ POST - Add Product
exports.postaddproducucts = (req, res, next) => {
    const { title, price, description, imgurl } = req.body;
    
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imgurl: imgurl
    });
    
    product.save()
        .then(() => {
            console.log('✅ Product created successfully');
            res.redirect('/admin/admin-products');
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.redirect('/admin/add-product');
        });
};

// ✅ GET - All Products (Admin View)
exports.getproducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/admin-products', {
                prods: products,
                 isauthenticated:req.session.logedin,
                 csrftoken: req.csrfToken()

            });
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.render('admin/admin-products', {
                prods: []
            });
        });
};

// ✅ GET - Edit Product Form
exports.geteditproduct = (req, res, next) => {
    const productid = req.params.productid;
    
    Product.findById(productid)
        .then(product => {
            if (!product) {
                return res.redirect('/admin/admin-products');
            }
            res.render('admin/edit-product', {
                product: product,
                isauthenticated:req.session.logedin,
                csrftoken: req.csrfToken()

            });
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.redirect('/admin/admin-products');
        });
};

// ✅ POST - Edit Product
exports.posteditproduct = (req, res, next) => {
    const id = req.body.productid;
    const { title, price, description, imgurl } = req.body;
    
    Product.findByIdAndUpdate(id, {
        title: title,
        price: price,
        description: description,
        imgurl: imgurl
    }, { new: true })
        .then(product => {
            if (!product) {
                console.log('❌ Product not found');
                return res.redirect('/admin/admin-products');
            }
            console.log('✅ Product edited successfully');
            res.redirect('/admin/admin-products');
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.redirect('/admin/admin-products');
        });
};

// ✅ POST - Delete Product
exports.postdeleteproduct = (req, res, next) => {
    const id = req.body.productid;
    
    Product.findByIdAndDelete(id)
        .then(result => {
            console.log('✅ Product deleted successfully');
            res.redirect('/admin/admin-products');
        })
        .catch(err => {
            console.log('❌ Error:', err);
            res.redirect('/admin/admin-products');
        });
};