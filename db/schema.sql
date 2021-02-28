DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    manager VARCHAR(30),
);