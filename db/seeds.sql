INSERT INTO department (department_name)
VALUES  ("Production"),
        ("Quality"),
        ("Finance"),
        ("Management");


INSERT INTO roles (title, salary, department_id)
VALUES('Designer', 80000, 2),
      ("Senior Designer", 120000, 2),
      ("President", 220000, 1),
      ("Production Worker",25000, 1),
      ("Intern", 30000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Joe", "Moma", 1, 1),
        ("Jane", "Doe", 2, 2),
        ("Eh", "Coli", 3, 3),
        ("Betty", "Crocker", 4, 4);


