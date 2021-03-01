DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

-- department 
CREATE TABLE departments(
  id INTEGER auto_increment PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

-- role 
CREATE TABLE roles(
    id INTEGER PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    -- dept & foreign key
    departments_id INTEGER(30) NOT NULL,
    CONSTRAINT fk_departments FOREIGN KEY (departments_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- employee 
CREATE TABLE employees(
  id INTEGER auto_increment PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  -- role & foreign key
  roles_id INTEGER(30) NOT NULL,
  CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
  -- manager key - by employee id
  manager_id INTEGER(30),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE
);