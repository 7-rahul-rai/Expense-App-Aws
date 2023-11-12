const Sequelize = require('sequelize')

var sequelize = new Sequelize('expenseaws','root','12345',{
    host:'localhost',
    dialect:'mysql'
})

try{
    sequelize.authenticate()
    console.log('Connection is established');
}
catch(e){
    console.log(e);
}

sequelize.sync({force:true})

module.exports = sequelize