const express = require('express');
const { title } = require('process');
const productscontroller = require('../controllers/admin.js');

const router=express.Router();

router.get('/add-product',productscontroller.getaddproducucts);
router.post('/add-product',productscontroller.postaddproducucts);
router.get('/admin-products', productscontroller.getproducts);
router.get('/edit-product/:productid', productscontroller.geteditproduct);
router.post('/edit-product',productscontroller.posteditproduct);
router.post('/delete-product',productscontroller.postdeleteproduct);



exports.router = router;