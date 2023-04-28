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
  

start();

//inquirer prompt
function start(){
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
            'Update employee manager',
            'View all employees by manager',
            'View all employees by department',
            'Remove employee',
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
}

//view all departments
function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        }
            console.table(results);
            //prompt questions again
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

//view all employees from employee table including employee ids, first names, last names, job titles, departments, salaries and manager id
function viewEmployees() {
    let sql = `SELECT e.id, e.first_name, e.last_name, 
    r.title AS job_title, d.department_name AS department, 
    r.salary, e.manager_id 
    FROM employee e 
    JOIN roles r ON e.id = r.id 
    JOIN department d ON r.department_id = d.id`;


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
        }else {
            console.log(`Added department ${response.name} successfully!`);
            // Select the added department and display the results
            db.query(`SELECT * FROM department WHERE department_name = ?`, params, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    console.table(results);
                    // Prompt questions again
                    start();
                }
            });
   }});
});
   
}

//add role 
async function addRole() {
    //prompted to enter the name, salary, and department for the role and that role is added to the database
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the role you would like to add',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role you would like to add',
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department id of the role you would like to add',
        },
    ]).then((response) => {
        console.log(`Adding role ${response.title}...`);
        let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        let params = [response.title, response.salary, response.departmentId];
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            } else{
                console.log(`Added role ${response.title} successfully!`);
                db.query(`SELECT * FROM roles WHERE title = ?`, response.title, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        start();
                    }
                });
            }
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
        let sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
        let params = [response.firstName, response.lastName, response.roleId, response.managerId];
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            } else{
                console.log(`Added employee ${response.firstName} ${response.lastName} successfully!`);
                db.query(`SELECT * FROM employee WHERE first_name = ? AND last_name = ?`, [response.firstName, response.lastName], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        start();
                    }
                });

            }
           
        });
    });
}




//update employee role
async function updateEmployeeRole() {
    //prompt
    await inquirer
    .prompt([
    {
        type: 'input',
        name: 'updateRole',
        message: 'Enter the employee id of the employee you would like to update the role for',
    },
    {
        type: 'input',
        name: 'newRole',
        message: 'Enter the new role id for the employee',
    }
    ]).then((response) => {
        console.log(`Updating employee ${response.updateRole}...`);
        let sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
        let params = [response.newRole, response.updateRole];
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            }else{
                console.log(`Updated employee ${response.updateRole} successfully!`);
                db.query(`SELECT * FROM employee WHERE id = ?`, response.updateRole, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        start();
                    }
                });
            }
        });
    });
}
    


//update employee manager, select employee by employee_id prompt prompt to update employee manager
function updateEmployeeManager() {
    const updateManager = inquirer
    .prompt([
        {
        type: 'input',
        name: 'updateManager',
        message: 'Enter the employee id of the employee you would like to update the manager for',
        },
        {
        type: 'input',
        name: 'newManager',
        message: 'Enter the new manager id for the employee',
        }
    ]).then((response) => {
        console.log(`Updating employee ${response.updateManager}...`);
        let sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
        let params = [response.newManager, response.updateManager];
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            } else{
                console.log(`Updated employee ${response.updateManager} successfully!`);
                db.query(`SELECT * FROM employee WHERE id = ?`, response.updateManager, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        start();
                    }
                });
            }
        });
    });
}


//view employees by managerid
async function viewEmployeesByManager() {
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager id of the employees you would like to view',
        }
    ]).then((response) => {
        console.log(`Viewing employees with manager id ${response.managerId}...`);
        let sql = `SELECT * FROM employee WHERE manager_id = ?`;
        let params = response.managerId;
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            } else{
                console.table(results);
                start();
            }
            
        });
    });
}

//view employees by department
async function viewEmployeesByDepartment() {
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department id of the employees you would like to view',
        }
    ]).then((response) => {
        console.log(`Viewing employees with department id ${response.departmentId}...`);
        let sql = `SELECT * FROM employee WHERE department_id = ?`;
        let params = response.departmentId;
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            } else{
                console.table(results);
                start();
            }
        });
    });
}


 //remove department
async function removeDepartment() {
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department id of the department you would like to remove',
        }
    ]).then((response) => {
        console.log(`Removing department ${response.departmentId}...`);
        let sql = `DELETE FROM department WHERE id = ?`;
        let deleteDepartment = response.departmentId
        db.query(`DELETE FROM department where id = ?`, deleteDepartment, (err, results) => {
            if (err) {
                console.log(err);
            } else{
                console.table(results);
                start();
            }
        });
    });
}   


//remove role
async function removeRole() {
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role id of the role you would like to remove',
        }
    ]).then((response) => {
        console.log(`Removing role ${response.roleId}...`);
        let sql = `DELETE FROM roles WHERE id = ?`;
        let deleteRole = response.roleId
        db.query(`DELETE FROM roles where id = ?`, deleteRole, (err, results) => {
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
    .prompt([
    {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the employee id of the employee you would like to remove',
    }
    ]).then((response) => {
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


//view budget of a department
async function viewBudget() {
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department id of the department you would like to view the budget for',
        }
    ]).then((response) => {
        console.log(`Viewing budget for department ${response.departmentId}...`);
        let sql = `SELECT SUM(salary) FROM roles WHERE department_id = ?`;
        let params = [response.departmentId];
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            start();
        });
    });
}
    



//exit function
function exit() {
    console.log('Goodbye!');
    process.exit();
}