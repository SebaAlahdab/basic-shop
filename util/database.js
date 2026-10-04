const mongodb =  require('mongodb');
const mongoclient =mongodb.MongoClient;

let _db;
const mongoconnct = callback=>{
    mongoclient.connect('mongodb+srv://seba2:somnrohr@cluster0.pnsklih.mongodb.net/?appName=shop')
.then(client=>{
    console.log('✅ connected successfully');
    _db =client.db();
    callback();
})
.catch(err=>{console.log(err)});

};
const getdb = ()=>{
if(_db){
    return _db;
}
else{
    throw 'no database found ' ;
}
}
exports.mongoconnct = mongoconnct;
exports.getdb = getdb ;







































// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('node-complete','root','somnrohr',{
//     dialect: 'mysql',
//     host:'localhost',
// });
// module.exports = sequelize;















// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host : 'localhost',
//     user : 'root',
//     database : 'node-complete',
//     password : 'somnrohr'
    
// });
// module.exports= pool.promise();