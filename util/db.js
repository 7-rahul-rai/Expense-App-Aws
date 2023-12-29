const Sequelize = require('sequelize')
require('dotenv').config()

var sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:'mysql'
})

try{
    sequelize.authenticate()
    console.log('Connection is established');
}
catch(e){
    console.log(e);
}

sequelize.sync({force:false})

module.exports = sequelize