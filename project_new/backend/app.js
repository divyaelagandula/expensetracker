const express = require('express');
const cors = require('cors');
const db = require('./utils/dbconnection');
const { DataTypes } = require('sequelize');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
console.log(db.models);
// ... (rest of the imports and setup)

// --------------------------------------------------------
// FIX: POST Insert Data
// --------------------------------------------------------
// app.get('/fetch-data/:tableName', async (req, res) => {
//     try {
//         const tableName = req.params.tableName;
//         console.log(tableName);
//         const DynamicModel = db.models[tableName];
//         console.log("DynamicModel:", DynamicModel);

//         if (!DynamicModel) {
//             return res.status(404).json({ error: `Model for table '${tableName}' not found. Did you create the table first?` });
//         }


//         const records = await DynamicModel.findAll();
//         console.log(`Fetched data from table ${tableName}:`, records);
//         res.status(200).json({ data: records });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Failed to fetch data from the table.' });
//     }
// });
app.get('/fetch-data/:tableName', async (req, res) => {
    try {
        const tableName = req.params.tableName;
        console.log("Requested table:", tableName);
        console.log("Available models:", db.models);
        // 🔹 Case-insensitive lookup for model name
        const modelName = Object.keys(db.models).find(
            m => m.toLowerCase() === tableName.toLowerCase()
        );

        const DynamicModel = db.models[modelName];
        console.log("Matched Sequelize Model:", modelName);

        if (!DynamicModel) {
            return res.status(404).json({
                error: `Model for table '${tableName}' not found. Did you create the table first?`
            });
        }

        // 🔹 Fetch all data from the dynamic model
        const records = await DynamicModel.findAll();
        console.log(`Fetched data from table ${tableName}:`, JSON.stringify(records, null, 2));

        // 🔹 Send JSON response
        res.status(200).json({ data: records });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from the table.' });
    }
});

app.post('/insert-data/:tableName', async (req, res) => {
    try {
        const tableName = req.params.tableName;
        const data = req.body;
        
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No data provided for insertion.' });
        }

        
        const DynamicModel = db.models[tableName];

        if (!DynamicModel) {
            return res.status(404).json({ error: `Model for table '${tableName}' not found. Did you create the table first?` });
        }
        
     
        console.log(`Inserting data into table ${tableName}:`, data);
        const insertedRecord = await DynamicModel.create(data);
        console.log(`Data inserted into table ${tableName}:`, insertedRecord.toJSON());
        
        res.status(200).json({ message: 'Data inserted successfully.', data: insertedRecord });

    } catch (error) {
        console.error('Error inserting data:', error);
        let errorMessage = 'Failed to insert data into the table.';
        if (error.errors) {
            errorMessage = error.errors.map(e => e.message).join(', ');
        }
        res.status(500).json({ error: errorMessage });
    }
});


app.get('/get-tables', async (req, res) => {
    try {
        const tableNames = await db.getQueryInterface().showAllTables();
        console.log("All Tables:", tableNames);
        const userTables = tableNames.filter(name => 
            name !== 'SequelizeMeta' && name !== 'sequelize_meta'
        );
        console.log("User-defined Tables:", userTables);
        res.status(200).json({ tables: userTables });
    } catch (error) {
        console.error('Error fetching tables:', error);
        res.status(500).json({ error: 'Failed to fetch table list using Sequelize interface.' });
    }
});

app.post('/create-table', async (req, res) => {
    try {
        
        const tableName = req.body.tableName; 
        const columns = req.body.columns; 
        
        if (!tableName || !columns || columns.length === 0) {
            return res.status(400).json({ error: 'Missing table name or columns.' });
        }

        const attributes = {};
        attributes['id'] = {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        };
        
     
        for (let column of columns) {
            if (column.name !== 'id') {
                attributes[column.name] = {
                    type: DataTypes[column.type],
                    allowNull: true, 

                };
            }
        }
        const DynamicModel = db.define(tableName, attributes, {
            freezeTableName: true, 
            timestamps: true,  
            modelName: tableName   
        });
        await DynamicModel.sync({ alter: true });
        const DynamicModel1 = db.models[tableName];
        console.log(`Table '${tableName}' created with model:`, DynamicModel1 === undefined ? 'undefined' : DynamicModel1.getTableName());
        console.log("All models after creation:", db.models);
        res.status(200).json({ message: `Table '${tableName}' created successfully.` });

    } catch (error) {
        console.error('Error creating table:', error);
        
        res.status(500).json({ 
            error: 'Failed to create table.',
            details: error.message
        });
    }
});
app.get('/get-columns/:tableName', async (req, res) => {
    try {
        const tableName = req.params.tableName;

      
        const columns = await db.getQueryInterface().describeTable(tableName);
        console.log(`Columns in table ${tableName}:`, columns);

    
        const columnDetails = Object.keys(columns).map(name => ({
            name: name,
            type: columns[name].type,
            allowNull: columns[name].allowNull,
            primaryKey: columns[name].primaryKey
        }));
        console.log(`Column details for table ${tableName}:`, columnDetails);

        res.status(200).json({ tableName: tableName, columns: columnDetails });

    } catch (error) {
        console.error(`Error fetching columns for table ${req.params.tableName}:`, error);
        res.status(404).json({ error: `Table '${req.params.tableName}' not found or database error.` });
    }
});
app.delete('/delete-record/:tableName/:id', async (req, res) => {
    try {
        const tableName = req.params.tableName;
        const id = req.params.id;

        console.log(`Deleting record from ${tableName} with ID: ${id}`);

        const DynamicModel = db.models[tableName];
        if (!DynamicModel) {
            return res.status(404).json({ error: `Model for table '${tableName}' not found.` });
        }

        const result = await DynamicModel.destroy({ where: { id: id } });
        if (result === 0) {
            return res.status(404).json({ error: `Record with ID '${id}' not found in table '${tableName}'.` });
        }

        res.status(200).json({ message: `Record with ID '${id}' deleted successfully from table '${tableName}'.` });
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ error: 'Failed to delete record from the table.' });
    }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

db.sync({ alter: true }).then(() => {
    console.log("All existing models were synchronized successfully.");
    console.log(db.models);
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Unable to sync the database:', error);
});