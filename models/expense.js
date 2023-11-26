const DataTypes = require('sequelize')
const sequelize = require('../util/db')

const Expense = sequelize.define("expense",{
    amount : {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    description : {
        type:DataTypes.STRING,
        allowNull: false
    },
    category : {
        type:DataTypes.STRING,
        allowNull: false
    }
})
    
module.exports = Expense