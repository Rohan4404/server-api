require("dotenv").config(); // Load env variables

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const util = require("util"); // To promisify MySQL queries for async/await

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set Content-Type to application/json for all responses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// MySQL connection pool setup for better performance
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Promisify queries to use async/await
const query = util.promisify(db.query).bind(db);

// Function to convert timestamp to Indian Standard Time (IST)
const convertToIST = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-IN", options);
};

// API to get last 20 records
app.get("/get-data2", async (req, res) => {
  try {
    const sql = "SELECT * FROM ctsensor_readings ORDER BY id DESC LIMIT 20";
    const results = await query(sql);

    res.status(200).json({ data2: results });
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ message: "Error retrieving data", error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);

  // Check database connection on startup
  db.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Error connecting to MySQL:", err.message);
    } else {
      console.log("✅ Connected to MySQL database successfully!");
      connection.release(); // release connection back to pool
    }
  });
});
