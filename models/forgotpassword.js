const DataTypes = require('sequelize');
const sequelize = require('../util/db');

const forgotPassword = sequelize.define("forgotPasswordRequests", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  });


module.exports = forgotPassword;