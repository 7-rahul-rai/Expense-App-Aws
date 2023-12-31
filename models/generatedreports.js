const Sequelize=require('sequelize');
const sequelize=require('../util/db');

const expenses=sequelize.define('generatedreports',
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    url:{
        type:Sequelize.STRING
    },
    filename:{
        type:Sequelize.STRING
    }
})
module.exports=expenses;