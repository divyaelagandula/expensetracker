const {DataTypes}=require('sequelize')
const db=require('../utils/dbconnection')
const users=db.define('users',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})
module.exports=users