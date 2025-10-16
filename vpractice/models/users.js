const {DataTypes}=require('sequelize')
const db=require('../utilss/db-connection')
const users=db.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    autoIncrement:true,
allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})
module.exports=users
