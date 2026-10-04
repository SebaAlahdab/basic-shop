const mongoose = require('mongoose');
const schema =  mongoose.Schema ; 
const productschema = new schema({
    title:{
        type : String , 
        required : true
    },
    price:{
        type : Number , 
        required : true
    },
    description:{
        type : String , 
        required : true
    },
    imgurl:{
        type : String , 
        required : true
    }
});
module.exports = mongoose.model('Product', productschema);





















// const mongoconnct = require('../util/database');
// const getdb = require('../util/database').getdb;

// class Product{
//         constructor (title,price,description,imgurl){
//             this.title=title; 
//             this.price=price;
//             this.description=description;
//             this.imgurl=imgurl;
    
//     }; 
//     save(){
//         const db=getdb();
//        return db.collection('products').insertOne(this)
//         .then(result =>{console.log(result)})
//         .catch(err => {console.log(err)});

//     };
//     static fetchall(){
//         const db=getdb();
//         return db.collection('products').find().toArray()
//         .then(products =>{console.log(products);
//             return products ;
//         })
//         .catch(err => {console.log(err)});
//     };
//     static findbyid(prodId){
//         const { ObjectId } = require('mongodb');
//         const db=getdb();
//         return db.collection('products').findOne({ 
//         _id: new ObjectId(prodId) 
//     })
//         .then(product =>{console.log(product);
//             return product ;
//         })
//         .catch(err => {console.log(err)});
//     };
//     static updatebyid(prodId,updatedData){
//         const { ObjectId } = require('mongodb');
//         const db=getdb();
//         return db.collection('products').updateOne({ 
//         _id: new ObjectId(prodId) },
//         {$set : updatedData}
//     )
//         .then(product =>{console.log(product);
//             return product ;
//         })
//         .catch(err => {console.log(err)});
//     };
//     static deletebyid(prodId){
//         const { ObjectId } = require('mongodb');
//         const db=getdb();
//         return db.collection('products').deleteOne({ 
//         _id: new ObjectId(prodId) 
//     })
//         .then(result =>{console.log('✅ deleted successfully');
//         })
//         .catch(err => {console.log(err)});
//     }

// }




// const Sequelize = require('sequelize');

// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,        
//         autoIncrement: true,    
//         allowNull: false         
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false         
//     },
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false         
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false         
//     },
//     imgurl: {
//         type: Sequelize.STRING,
//         allowNull: false         
//     }
// });

// module.exports = Product;