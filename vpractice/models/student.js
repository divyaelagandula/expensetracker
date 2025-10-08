const { Sequelize, DataTypes } = require('sequelize');

sequelize = require('../utils/dbconnection');
const student = sequelize.define(
  'Student',
  {
    id:{
        type: DataTypes.INTEGER,    
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
);
module.exports = student;