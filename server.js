//require inquirer
const inquirer = require('inquirer');

//require fs
const fs = require('fs');

//require console.table
const cTable = require('console.table');
//require connection.js
const db = require('./db/connection.js');
// require dotenv to get username and password from env file
require('dotenv').config();
//require mysql12
const mysql = require('mysql2');
  

//inquirer prompt
const menuQuestions =
    inquirer
        .prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            //  add an employee, and update an employee role
            
            'View all employees by department',
            'View all employees by manager',
            'Remove employee',
            'Update employee manager',
            'Remove role',
            'Remove department',
            'View the total utilized budget of a department',
            'Exit'
        ]
    })
    .then((response) => {
        //switch case depending on user selection
        switch (response.menu) {
            case 'View all departments':
                viewDepartments();
                break;

            case 'View all roles':
                viewRoles();
                break;

            case 'View all employees':
                viewEmployees();
                break;

            case 'Add department':
                addDepartment();
                break;

            case 'Add role':
                addRole();
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
            
            case 'View all employees by manager':
                viewEmployeesByManager();
                break;
            
            case 'View all employees by department':
                viewEmployeesByDepartment();
                break;

            case 'Remove department':
                removeDepartment();
                break;

            case 'Remove role':
                removeRole();
                break;

            case 'Remove employee':
                removeEmployee();
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

//start function
function start() {
    menuQuestions;
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

//view all roles
function viewRoles() {
    db.query(`SELECT * FROM roles`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start();
    });
}

//view all employees
function viewEmployees() {

    //query employee data including employee ids, first names, last names, job titles, departments, salaries and manager id
    let sql = `SELECT * from employee, 
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    department.department_name AS 'department', 
    roles.salary
    FROM employee, roles, department 
    WHERE department.id = roles.department_id 
    AND roles.id = employee.roles_id
    ORDER BY employee.id ASC`;
    db.query(sql, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.table(response);
        start();
    });
}

//add department
async function addDepartment() {
     // Function to add a department
await inquirer
  .prompt([
    {
      name: "name",
      type: "input",
      message: "What department would you like to add?",
    },
  ])
   .then((response) => {
    console.log(`Adding department ${response.name}...`);
    let sql = `INSERT INTO department (department_name) VALUES (?)`;
   //set variable for response name
    let params = response.name;
    db.query(sql, params, (err,results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    });
  });
   
}


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
    let deleteEmployee = 
    db.query(`DELETE FROM employee where id = ?`, deleteEmployee, (err, results) => {
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

//update employee manager, select employee by employee_id prompt prompt to update employee manager
function updateEmployeeManager() {
    const updateManager = inquirer
    .prompt({
        type: 'input',
        name: 'updateManager',
        message: 'Enter the employee id of the employee you would like to update the manager for',
        validate: employeeId => {
            if (employeeId) {
                return true;
            } else {
                console.log('Please enter the employee id of the employee you would like to update the manager for');
                return false;
            }
        }
    }).then((response) => {
        db.query(`SELECT * FROM employee WHERE employee_id = ${response.employeeId}`, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            managerID();
        }
    )})
    }
    //function to prompt new manager ID

    function managerID() {
        const managerId = inquirer
        .prompt({
            type: 'input',
            name: 'managerId',
            message: 'Enter the id of the new manager',
            validate: managerId => {
                if (managerId) {
                    return true;
                } else {
                    console.log('Please enter the id of the new manager');
                    return false;
                }
            }
        }).then((response) => {
            //update response.employeeID with new managerId
            db.query(`UPDATE employee SET manager_id = ${response.managerId} WHERE employee_id = ${response.employeeId}`, (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.table(results);
                start();
            }
        )})
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



//exit function
function exit() {
    console.log('Goodbye!');
    process.exit();
}
