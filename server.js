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

//view all employees including employee ids, first names, last names, job titles, departments, salaries and manager id
function viewEmployees() {
    let sql = `SELECT * FROM employee VALUE(? ? ? ? ? ? ?)`;
    let params = [employee_id, first_name, last_name, role_id, manager_id]; 

    db.query(sql, params, (err, response) => {
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


//add employee
async function addEmployee() {
    //prompt for employee first name, last name, role id, manager id
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee you would like to add',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee you would like to add',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role id of the employee you would like to add',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager id of the employee you would like to add',
        },
    ]).then((response) => {
        console.log(`Adding employee ${response.firstName} ${response.lastName}...`);
        let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    //set variable for response first name, last name, role id, manager id
        let params = [response.firstName, response.lastName, response.roleId, response.managerId];
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            start();
        });
    });
}

//remove employee
async function removeEmployee() {
    //prompt for employee id
    await inquirer
    .prompt({
        type: 'input',
        name: 'employeeId',
        message: 'Enter the employee id of the employee you would like to remove',
    }).then((response) => {
        console.log(`Removing employee ${response.employeeId}...`);
        let sql = `DELETE FROM employee WHERE id = ?`;
    //set variable for response employee id
        let deleteEmployee = response.employeeId
        db.query(`DELETE FROM employee where id = ?`, deleteEmployee, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            start();
    }); 
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
