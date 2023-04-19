// require dotenv
require('dotenv').config();

// require express
const express = require('express');

//require inquirer
const inquirer = require('inquirer');

//require fs
const fs = require('fs');

//require console.table
const cTable = require('console.table');

//require mysql12
const mysql = require('mysql2');

//port
const PORT = process.env.PORT || 3001;

//call express function varibale
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.USER,
        // MySQL password
        password: process.env.PASSWORD,
        // company database
        database: 'employees_db',
        // port
        port: 3001,
    },
    console.log(`Connected to the company database.`)
);
        