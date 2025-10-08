const { Sequelize, DataTypes } = require('sequelize');

sequelize = require('../utils/dbconnection');
const identity = sequelize.define(
  'identity',
  {
    id:{
        type: DataTypes.INTEGER,    
        autoIncrement: true,
        primaryKey: true,
    },
    cardno:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
  },
);
module.exports = identity;