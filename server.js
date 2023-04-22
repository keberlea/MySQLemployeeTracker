//require inquirer
const inquirer = require('inquirer');

//require fs
const fs = require('fs');

//require console.table
const cTable = require('console.table');

//require connection.js
const db = require('./db/connection.js');

//inquirer prompt
const menuQuestions =
    inquirer
        .prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add employee',
            'Remove employee',
            'Update employee role',
            'Update employee manager',
            'View all roles',
            'Add role',
            'Remove role',
            'View all departments',
            'Add department',
            'Remove department',
            'View the total utilized budget of a department',
            'Exit'
        ]
    })
    .then((answer) => {
        //switch case depending on user selection
        switch (answer.menuQuestions) {
            case 'View all employees':
                viewEmployees();
                break;

            case 'View all employees by department':
                viewEmployeesByDepartment();
                break;

            case 'View all employees by manager':
                viewEmployeesByManager();
                break;

            case 'Add employee':
                addEmployee();
                break;

            case 'Remove employee':
                removeEmployee();
                break;

            case 'Update employee role':
                updateEmployeeRole();
                break;

            case 'Update employee manager':
                updateEmployeeManager();
                break;

            case 'View all roles':
                viewRoles();
                break;

            case 'Add role':
                addRole();
                break;

            case 'Remove role':
                removeRole();
                break;

            case 'View all departments':
                viewDepartments();
                break;

            case 'Add department':
                addDepartment();
                break;

            case 'Remove department':
                removeDepartment();
                break;

            case 'View the total utilized budget of a department':
                viewBudget();
                break;

            case 'Exit':
                exit();
                break;
        }
    }
    );


//view all employees by their first name, last name, department, role and manager id

function viewEmployees() {
    //set sql variable for query response
    const sql = 'SELECT * FROM employee'
    db.query(sql, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log("Viewing all employees...")
        console.table(response);
        }
    
    );
        menuQuestions()
    };

//view all employees by department
function viewEmployeesByDepartment() {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//view all employees by manager
function viewEmployeesByManager() {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//add employee
function addEmployee() {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//remove employee
function removeEmployee() {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//update employee role
function updateEmployeeRole() {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//update employee manager
function updateEmployeeManager() {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//view all roles
function viewRoles() {
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}


//add role
function addRole() {
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//remove role
function removeRole() {
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//view all departments
function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//add department
function addDepartment() {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//remove department
function removeDepartment() {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//view budget
function viewBudget() {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}


//start
function start() {
    menuQuestions;
}




