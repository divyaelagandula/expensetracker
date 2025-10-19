const express = require('express');
const users = require('./models/users'); 
const expenses=require('./models/expenses')
const index=require('./models/index')
const userroutes=require('./routes/userroutes')
const expenseroutes=require('./routes/expenseroutes')
const paymentroutes=require('./routes/paymentroutes')
const db = require('./utilss/db-connection'); 
const cors = require('cors');

const app = express();


app.use(express.json()); 
app.use(cors());
app.use('/membership',paymentroutes)
app.use('/users',userroutes)
app.use('/expense',expenseroutes)


app.get('/', (req, res) => {
    res.send('Server is running and listening on port 3000');
});




db.sync({ alter: true }).then(() => {
    console.log('Database synchronized successfully');
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}).catch(err => {
    console.error('Failed to synchronize database:', err);
});