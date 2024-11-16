// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const util = require('util'); // To promisify MySQL queries for async/await

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Set Content-Type to application/json for all responses
// app.use((req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     next();
// });

// // MySQL connection pool setup for better performance
// const db = mysql.createPool({
//     connectionLimit: 10, // Set a limit on number of connections
//     host: 'database-1.clh4nxlube9m.us-east-1.rds.amazonaws.com',
//     user: 'admin', // Replace with your DB username
//     password: 'J$^CenTX1', // Replace with your DB password
//     database: 'server_db' // Replace with your database name
// });

// // Promisify queries to use async/await
// const query = util.promisify(db.query).bind(db);

// // Function to convert timestamp to Indian Standard Time (IST)
// const convertToIST = (timestamp) => {
//     const date = new Date(timestamp);
//     const options = {
//         timeZone: 'Asia/Kolkata',
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: false // 24-hour format
//     };
//     return date.toLocaleString('en-IN', options);
// };

// app.post('/save-data2', async (req, res) => {
//     const { current2, power2, temperature } = req.body;
//     const timestamp = Date.now(); // Get the current timestamp in milliseconds
//     const istTime = convertToIST(timestamp);

//     try {
//         const sql = 'INSERT INTO data2 (current2, power2, temperature, timestamp) VALUES (?, ?, ?, ?)';
//         const result = await query(sql, [current2, power2, temperature, istTime]);

//         res.status(201).json({
//             message: 'Data saved successfully',
//             data2: { id: result.insertId, current2, power2, temperature, timestamp: istTime }
//         });
//     } 
//     catch (err) {
//         console.error('Error saving data:', err);
//         res.status(500).json({ message: 'Error saving data', error: err });
//     }
// });


// app.get('/get-data2', async (req, res) => {
//     try {
//         const sql = 'SELECT * FROM data2';
//         const results = await query(sql);

//         res.status(200).json({ data2: results });
//     } 
//     catch (err) {
//         console.error('Error retrieving data:', err);
//         res.status(500).json({ message: 'Error retrieving data', error: err });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util'); // To promisify MySQL queries for async/await

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set Content-Type to application/json for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// MySQL connection pool setup for better performance
const db = mysql.createPool({
    connectionLimit: 10, // Set a limit on number of connections
    host: 'database-1.clh4nxlube9m.us-east-1.rds.amazonaws.com',
    user: 'admin', // Replace with your DB username
    password: 'J$^CenTX1', // Replace with your DB password
    database: 'server_db' // Replace with your database name
});

// Promisify queries to use async/await
const query = util.promisify(db.query).bind(db);

// Function to convert timestamp to Indian Standard Time (IST)
const convertToIST = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24-hour format
    };
    return date.toLocaleString('en-IN', options);
};

// Save data endpoint
app.post('/save-data2', async (req, res) => {
    const { current2, power2, temperature } = req.body;
    const timestamp = Date.now(); // Get the current timestamp in milliseconds
    const istTime = convertToIST(timestamp);

    try {
        const sql = 'INSERT INTO data2 (current2, power2, temperature, timestamp) VALUES (?, ?, ?, ?)';
        const result = await query(sql, [current2, power2, temperature, istTime]);

        res.status(201).json({
            message: 'Data saved successfully',
            data2: { id: result.insertId, current2, power2, temperature, timestamp: istTime }
        });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ message: 'Error saving data', error: err });
    }
});

// Get 50 latest entries endpoint
app.get('/get-data2', async (req, res) => {
    try {
        const sql = 'SELECT * FROM data2 ORDER BY timestamp DESC LIMIT 20';
        const results = await query(sql);

        res.status(200).json({ data2: results });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ message: 'Error retrieving data', error: err });
    }
});

// Periodic database update
setInterval(async () => {
    try {
        const timestamp = Date.now();
        const istTime = convertToIST(timestamp);

        // Update database entries (e.g., setting temperature to a default value or timestamp)
        const sql = 'UPDATE data2 SET temperature = temperature + 1, timestamp = ?';
        await query(sql, [istTime]);

        console.log('Database updated at:', istTime);
    } catch (err) {
        console.error('Error updating database:', err);
    }
}, 15000); // 15 seconds interval

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
