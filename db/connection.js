// require dotenv to get username and password from env file
require('dotenv').config();
//require mysql12
const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.USER,
        // MySQL password
        password: process.env.PASSWORD,
        // company database
        database: 'employee_db',
    }
);

//export connection for use in other files
module.exports = db;
