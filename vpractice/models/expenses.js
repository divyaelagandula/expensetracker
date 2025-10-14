const {DataTypes}=require('sequelize')
const db=require('../utilss/db-connection')
const expenses=db.define('expenses',{
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    category:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})
module.exports=expenses
