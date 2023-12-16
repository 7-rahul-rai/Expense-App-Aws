const DataTypes = require('sequelize')
const sequelize = require('../util/db')

const User = sequelize.define("user",{
    name : {
        type:DataTypes.STRING,
        allowNull: false
    },
    email : {
        type:DataTypes.STRING,
        allowNull: false
    },
    password : {
        type:DataTypes.STRING,
        allowNull: false
    },
    ispremiumuser : {
        type : DataTypes.BOOLEAN
    }
    ,
    totalexpenses : {
        type: DataTypes.INTEGER  ,  
        defaultValue : 0 
    }

})
    
module.exports = User