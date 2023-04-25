DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);

INSERT INTO department (department_name)
VALUES  ("Production"),
        ("Quality"),
        ("Finance"),
        ("Management");

INSERT INTO roles (title, salary, department_id)
VALUES('Designer', 80000, 2),
      ("Senior Designer", 120000, 2),
      ("President", 220000, 1),
      ("Intern", 30000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Joe", "Moma", 1, 1),
        ("Jane", "Doe", 2, 2),
        ("Eh", "Coli", 3, 3),
        ("Betty", "Crocker", 4, 4);