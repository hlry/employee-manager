
const inquirer = require('inquirer');
const db = require('./db');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const config = require('./package.json');
require('dotenv').config();

console.log(logo(config).render());

const PORT = process.env.PORT || 3001;

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
});

// call the connect method on the connection object to connect to MySQL database server
connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

// prompt user with questions

function questions() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Departments',
            'View All Roles',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role'
        ]
    }).then(function (answer) {
        switch (action) {
            case "View All Employees":
                getEmployeeNames();
                break;
            case "View All Departments":
                getDepartmentsNames();
                break;
            case "View All Roles":
                getRoleNames();
                break;
            case "Add a Department":
                addNewDepartment();
                break;
            case "Add a Role":
                addNewRole();
                break;
            case "Add an Employee":
                addNewEmployee();
                break;
            case "Update an Employee Role":
                updateRole();
                break;
        } console.log("The answer is " + answer);
    })
};

// View All Employees
getEmployeeNames = () => {
    let query = `
        SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roles.title AS "Job Title", departments.name AS "Department", FORMAT(roles.salary, 'C') Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
        FROM employees employee
        LEFT JOIN roles ON employee.roles_id = roles.id 
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees manager ON employee.manager_id = manager.id;`
    connection.query(query, function (err, results) {
        if (err) throw err
        console.log('All Employees \n')
        console.table(results)
        promptUserAction()
    })
};

// getEmployeeNames = () => {
//     let query = `
//         SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", roles.title AS "Job Title", departments.name AS "Department", FORMAT(roles.salary, 'C') Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
//         FROM employees e
//         LEFT JOIN roles ON e.roles_id = roles.id 
//         LEFT JOIN departments ON roles.department_id = departments.id
//         LEFT JOIN employees m ON e.manager_id = m.id;`
//     connection.query(query, function (err, results) {
//         if (err) throw err
//         console.log('All Employees \n')
//         console.table(results)
//         promptUserAction()
//     })
// };

// View All Departments
getDepartmentsNames = () => {
    let query = `
    SELECT departments.id AS "Dept Name",
    FROM departments
    LEFT JOIN departments ON roles.department_id = departments.id;`
    connection.query(query, function (err, results) {
        if (err) throw err
        console.log('All Departments \n')
        console.table(results)
        promptUserAction()
    })
};

// View All Roles
getRoleNames = () => {
    let query = `
    SELECT roles.id as "Role",
    FROM roles
    LEFT JOIN roles ON e.roles_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id;`
    connection.query(query, function (err, results) {
        if (err) throw err
        console.log('All Roles\n')
        console.table(results)
        promptUserAction()
    })
};

// Add a Department
addNewDepartment = () => {
    // this add new department
};

// Add a Role
addNewRole = () => {
    // this will add new role
};

// Add an Employee
addNewEmployee = () => {
    // this will add new employee
};

// Update an Employee Role
updateRole = () => {
    // this will update an employee's role
};



// Default response for any other request(Not Found) Catch all other
// app.use((req, res) => {
//     res.status(404).end();
// });

// run questions function
questions();