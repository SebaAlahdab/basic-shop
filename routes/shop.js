const express = require('express');
const router = express.Router();
const adminData = require('./admin');
const shopcontroller=require('../controllers/shop.js')

router.get('/',shopcontroller.getindex); 
router.get('/products',shopcontroller.getproducts);
router.post('/cart',shopcontroller.postcart);
router.get('/cart',shopcontroller.getcart);
router.get('/product-detail/:productid',shopcontroller.getdetails);
router.post('/delete-from-cart',shopcontroller.delete);
// router.get('chechout');
module.exports=router;
