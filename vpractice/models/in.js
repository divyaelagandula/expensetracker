const users=require('./users')
const expenses=require('./expenses')
const forgetpassword=require('./forgetpassword')
users.hasMany(expenses)
expenses.belongsTo(users)

users.hasMany(forgetpassword);
forgetpassword.belongsTo(users);
module.exports={
    users,
    expenses,
    forgetpassword
}