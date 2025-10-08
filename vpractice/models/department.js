const { Sequelize, DataTypes } = require('sequelize');

sequelize = require('../utils/dbconnection');
const department = sequelize.define(
  'department',
  {
    id:{
        type: DataTypes.INTEGER,    
        autoIncrement: true,
        primaryKey: true,
    },
    departmentName:{
        type: DataTypes.STRING,
    }
  },
);
module.exports = department;