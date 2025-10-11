const {Sequelize} = require('sequelize');
sequelize = new Sequelize('dd', 'root', 'Divhari1@', {
    host: 'localhost',
    dialect: 'mysql'
});
async function authenticate(){
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}
module.exports =  sequelize;