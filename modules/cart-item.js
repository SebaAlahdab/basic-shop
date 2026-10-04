const Sequelize = require('sequelize');
const sequelize = require('../util/database'); 

const Cartitem =sequelize.define('cartitem',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement : true,
        notNull:true,
        primaryKey:true
    },
    quantity:{
         type:Sequelize.INTEGER,
         allowNull:true,
    }
})
module.exports = Cartitem ;