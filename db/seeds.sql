INSERT INTO department (department_name)
VALUES  ("Production"),
        ("Quality"),
        ("Finance"),
        ("Management");


INSERT INTO roles (title, salary, department_id)
VALUES("Production Manager", 80000, 1),
      ("Accountant", 120000, 3),
      ("President", 220000, 4),
      ("Production Worker",25000, 1);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES  ("Joe", "Moma", 1, 1),
        ("Jane", "Doe", 2, 2),
        ("Eh", "Coli", 3, 3),
        ("Betty", "Crocker", 4, 4);


