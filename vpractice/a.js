const express = require('express');
const users = require('./models/users'); // Assuming 'users' is your Sequelize model
const db = require('./utils/dbconnection'); // Assuming 'dbconnection' is your Sequelize instance
const cors = require('cors');
// const mysql2 = require('mysql2'); // This require is unnecessary if only using Sequelize

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To allow requests from the frontend origin

app.get('/', (req, res) => {
    res.send('Server is running and listening on port 3000');
});

app.post('/user/signup', async (req, res) => {
    try { 
        console.log("Received data:", req.body);

        // 🟢 FIX: Changed variable name from 'res' to 'result' to avoid shadowing the Express 'res' object
        const result = await users.create(req.body); 
        
        // Use the Express 'res' object to send the response
        res.status(201).json({ message: 'User details added successfully' });
    }
    catch (error) {
        console.error("Database error:", error);
        
        // Handle common Sequelize validation errors (optional, but good practice)
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(409).json({ error: 'Email address already exists.' });
        }
        
        // Send a generic 500 error for other failures
        res.status(500).json({ error: 'Failed to add details to the database.' });
    }
});

// Database Synchronization and Server Start
db.sync({ alter: true }).then(() => {
    console.log('Database synchronized successfully');
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}).catch(err => {
    console.error('Failed to synchronize database:', err);
});