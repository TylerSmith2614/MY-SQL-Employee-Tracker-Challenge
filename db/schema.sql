DROP DATABASE IF EXISTS tspapercompany_db;
CREATE DATABASE tspapercompany_db;

USE tspapercompany_db;


CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary Decimal,
department_id INT NOT NULL
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL
role_id INT NOT NULL
manager_id INT
);
