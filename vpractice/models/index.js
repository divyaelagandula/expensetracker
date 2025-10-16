const users=require('./users')
const expenses=require('./expenses')
users.hasMany(expenses)
expenses.belongsTo(users)
module.exports={
    users,
    expenses
}