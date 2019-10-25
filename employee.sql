DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(10) NOT NULL,
  manager_id INTEGER(10) NULL,
  PRIMARY KEY (id)
);



CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Game Development"), ("Graphic Art"), ("IT"), ("Management"), ("Business and Revenue");

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary Decimal(8,2),
    department_id  VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 600000.00, 1), ("Programmer", 58000.00, 1), ("Tester", 30000.00, 1), ("Technical Consultant", 40000.00, 1);

INSERT INTO roles (title, salary, department_id)
Value("Manager", 600000.00, 2), ("Graphical Artist", 75000.00, 2), ("Concept Artists", 50000.00, 2);

INSERT INTO roles (title, salary, department_id)
Value("Manager", 600000.00, 3), ("It Expert", 75000.00, 3), ("Technical Support", 75000.00, 3);

INSERT INTO roles (title, salary, department_id)
Value("Project Lead", 700000.00, 4), ("Creative Director", 700000.00, 4), ("Lead Writer", 600000.00, 4);

INSERT INTO roles (title, salary, department_id)
Value("Marketer", 700000.00, 5), ("Secretary", 700000.00, 5), ("CEO", 600000.00, 5), ("Assistant", 1000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
Value("Lawrence", "Rush", 16, null), ("Meera", "Dubey", 1, NULL)