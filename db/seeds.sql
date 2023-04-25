INSERT INTO department (department_name)
VALUES  ("Production"),
        ("Quality"),
        ("Finance"),
        ("Management");


INSERT INTO roles (title, salary, department_id)
VALUES("Production Manager", 80000, 3),
      ("Accountant", 120000, 2),
      ("President", 220000, 1),
      ("Production Worker",25000, 3),
      ("Sanitation", 30000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "Joe", "Moma", 1, 1),
        (002, "Jane", "Doe", 2, 2),
        (003, "Eh", "Coli", 3, 3),
        (004, "Betty", "Crocker", 4, 4);


