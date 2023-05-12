

INSERT INTO department (department_name)
VALUES ("Corporate"),
("Management"),
("Sales"),
("Accounting"),
("Human Resources"),
("Reception"),
("Product Oversight"),
("Warehouse");

INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Financial Officer", 250000, 1),
("VP of Northeast Sales", 150000, 1),
("Regional Manager", 80000, 2),
("Sales Rep.", 90000, 3),
("Accountant", 75000, 4),
("H.R. Rep", 55000, 5),
("Reception", 45000, 6),
("Supplier Relations Rep", 55000, 7),
("Quality Assurance Rep", 55000, 7),
("Warehouse Foreman", 65000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('David', 'Wallace', 1, 1),
('Jan', 'Levinson', 2, 1),
('Michael', 'Scott', 3, 2),
('Dwight', 'Shrute', 4, 3),
('Jim', 'Halpert', 4, 3),
('Oscar', 'Martinez', 5, 3),
('Angela', 'Martin', 5, 3),
('Kevin', 'Malone', 4, 3),
('Toby', 'Flenderson', 5, 2),
('Merideth', 'Palmer', 6, 3),
('Creed', 'Bratton', 7, 3),
('Darryl', 'Philbin', 8, 3);