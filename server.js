

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set Content-Type to application/json for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// MySQL database connection setup
const db = mysql.createConnection({
    host: 'database-1.clh4nxlube9m.us-east-1.rds.amazonaws.com',
    user: 'admin', // Replace with your DB username
    password: 'J$^CenTX1', // Replace with your DB password
    database: 'server_db' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

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

// Endpoint to save data
app.post('/save-data', (req, res) => {
    const { current, power } = req.body;
    const timestamp = Date.now(); // Get the current timestamp in milliseconds

    // Insert data into the database
    const sql = 'INSERT INTO data (current, power, timestamp) VALUES (?, ?, ?)';
    db.query(sql, [current, power, timestamp], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ message: 'Error saving data', error: err });
        } else {
            const istTime = convertToIST(timestamp);
            res.status(201).json({
                message: 'Data saved successfully',
                data: { id: result.insertId, current, power, timestamp: istTime }
            });
        }
    });
});

// Endpoint to get all data
app.get('/get-data', (req, res) => {
    const sql = 'SELECT * FROM data';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data', error: err });
        } else {
            // Convert timestamps to IST and format them as 'YYYY-MM-DD HH:MM:SS'
            const dataWithIST = results.map(row => ({
                ...row,
                timestamp: convertToIST(row.timestamp)
            }));
            res.status(200).json({ data: dataWithIST });
        }
    });
});
// Endpoint to save data2
app.post('/save-data2', (req, res) => {
    const { current2, power2 } = req.body;
    const timestamp = Date.now(); // Get the current timestamp in milliseconds

    // Insert data into the database
    const sql = 'INSERT INTO data2 (current2, power2, timestamp) VALUES (?, ?, ?)';
    db.query(sql, [current2, power2, timestamp], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ message: 'Error saving data', error: err });
        } else {
            const istTime = convertToIST(timestamp);
            res.status(201).json({
                message: 'Data saved successfully',
                data2: { id: result.insertId, current2, power2, timestamp: istTime }
            });
        }
    });
});






app.get('/get-data2', (req, res) => {
    const sql = 'SELECT * FROM data2';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data', error: err });
        } else {
            // Convert timestamps to IST and format them as 'YYYY-MM-DD HH:MM:SS'
            const dataWithIST = results.map(row => ({
                ...row,
                timestamp: convertToIST(row.timestamp)
            }));
            res.status(200).json({ data2: dataWithIST });
        }
    });
});
// Endpoint to get all data2
// app.get('/get-data2', (req, res) => {
//     const sql = 'SELECT * FROM data2';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error retrieving data:', err);
//             res.status(500).json({ message: 'Error retrieving data', error: err });
//         } else {
//             // Convert timestamps to IST
//             const dataWithIST = results.map(row => ({
//                 ...row,
//                 timestamp: convertToIST(row.timestamp)
//             }));
//             res.status(200).json({ data2: dataWithIST });
//         }
//     });
// });

// Endpoint to save data3
app.post('/save-data3', (req, res) => {
    const { current3, power3 } = req.body;
    const timestamp = Date.now(); // Get the current timestamp in milliseconds

    // Insert data into the database
    const sql = 'INSERT INTO data3 (current3, power3, timestamp) VALUES (?, ?, ?)';
    db.query(sql, [current3, power3, timestamp], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ message: 'Error saving data', error: err });
        } else {
            const istTime = convertToIST(timestamp);
            res.status(201).json({
                message: 'Data saved successfully',
                data3: { id: result.insertId, current3, power3, timestamp: istTime }
            });
        }
    });
});

// Endpoint to get all data3
// app.get('/get-data3', (req, res) => {
//     const sql = 'SELECT * FROM data3';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error retrieving data:', err);
//             res.status(500).json({ message: 'Error retrieving data', error: err });
//         } else {
//             // Convert timestamps to IST
//             const dataWithIST = results.map(row => ({
//                 ...row,
//                 timestamp: convertToIST(row.timestamp)
//             }));
//             res.status(200).json({ data3: dataWithIST });
//         }
//     });
// });


app.get('/get-data3', (req, res) => {
    const sql = 'SELECT * FROM data3';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data', error: err });
        } else {
            // Convert timestamps to IST and format them as 'YYYY-MM-DD HH:MM:SS'
            const dataWithIST = results.map(row => ({
                ...row,
                timestamp: convertToIST(row.timestamp)
            }));
            res.status(200).json({ data3: dataWithIST });
        }
    });
});

// Endpoint to save data4
app.post('/save-data4', (req, res) => {
    const { current4, power4 } = req.body;
    const timestamp = Date.now(); // Get the current timestamp in milliseconds

    // Insert data into the database
    const sql = 'INSERT INTO data4 (current4, power4, timestamp) VALUES (?, ?, ?)';
    db.query(sql, [current4, power4, timestamp], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ message: 'Error saving data', error: err });
        } else {
            const istTime = convertToIST(timestamp);
            res.status(201).json({
                message: 'Data saved successfully',
                data4: { id: result.insertId, current4, power4, timestamp: istTime }
            });
        }
    });
});

// Endpoint to get all data4
// app.get('/get-data4', (req, res) => {
//     const sql = 'SELECT * FROM data4';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error retrieving data:', err);
//             res.status(500).json({ message: 'Error retrieving data', error: err });
//         } else {
//             // Convert timestamps to IST
//             const dataWithIST = results.map(row => ({
//                 ...row,
//                 timestamp: convertToIST(row.timestamp)
//             }));
//             res.status(200).json({ data4: dataWithIST });
//         }
//     });
// });


app.get('/get-data4', (req, res) => {
    const sql = 'SELECT * FROM data4';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data', error: err });
        } else {
            // Convert timestamps to IST and format them as 'YYYY-MM-DD HH:MM:SS'
            const dataWithIST = results.map(row => ({
                ...row,
                timestamp: convertToIST(row.timestamp)
            }));
            res.status(200).json({ data4: dataWithIST });
        }
    });
});
// Endpoint to save data5
app.post('/save-data5', (req, res) => {
    const { current5, power5 } = req.body;
    const timestamp = Date.now(); // Get the current timestamp in milliseconds

    // Insert data into the database
    const sql = 'INSERT INTO data5 (current5, power5, timestamp) VALUES (?, ?, ?)';
    db.query(sql, [current5, power5, timestamp], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ message: 'Error saving data', error: err });
        } else {
            const istTime = convertToIST(timestamp);
            res.status(201).json({
                message: 'Data saved successfully',
                data5: { id: result.insertId, current5, power5, timestamp: istTime }
            });
        }
    });
});

// Endpoint to get all data5
// app.get('/get-data5', (req, res) => {
//     const sql = 'SELECT * FROM data5';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error retrieving data:', err);
//             res.status(500).json({ message: 'Error retrieving data', error: err });
//         } else {
//             // Convert timestamps to IST
//             const dataWithIST = results.map(row => ({
//                 ...row,
//                 timestamp: convertToIST(row.timestamp)
//             }));
//             res.status(200).json({ data5: dataWithIST });
//         }
//     });
// });


app.get('/get-data5', (req, res) => {
    const sql = 'SELECT * FROM data5';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data', error: err });
        } else {
            // Convert timestamps to IST and format them as 'YYYY-MM-DD HH:MM:SS'
            const dataWithIST = results.map(row => ({
                ...row,
                timestamp: convertToIST(row.timestamp)
            }));
            res.status(200).json({ data5: dataWithIST });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});