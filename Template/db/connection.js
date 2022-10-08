const mysql = require("mysql2");
// Import & Require mysql12
const express = require('express');
const PORT = process.env.port || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "pass",
  database: "employees"
});

connection.connect(function (err) {
  if (err) throw err;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = connection;
