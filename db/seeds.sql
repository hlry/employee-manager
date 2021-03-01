
-- department 
INSERT INTO department (dept_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- Quickrefs for depts - Sales: 1; Engineering: 2; Finance: 3; Legal: 4;

-- role 
INSERT INTO role (job_title, salary, department_id)
VALUES
  ('Sales Lead', '100000', 1), 
  ('Salesperson', '80000', 1), 
  ('Lead Engineer', '150000', 2),
  ('Software Engineer', '120000', 2),
  ('Accountant', '125000', 3),
  ('Legal Counsel', '190000', 4),
  ('General Counsel', '300000', 4);

-- Quickrefs for roles - Sales Lead: 1; Sales Person: 2; : 3; Legal: 4;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 7, NULL),
  ('Peter', 'Greenaway', 6, 7),
  ('Derek', 'Jarman', 4, 2,
  ('Paolo', 'Pasolini', 3, NULL),
  ('Heathcote', 'Williams', 3, NULL);
