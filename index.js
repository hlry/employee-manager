const express = require('express');
const inquirer = require('inquirer');
//change references to db to employees_db
// const db = require('employees_db');
const sql = require('mysql2');
const config = require('package.json');
// const { Router } = require('express');
// const { resolveSoa } = require('dns');
console.log(logo(config).render());

const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees_db'
});
// 
connection.connect

// prompt user with questions


// const interactWithUser = () => {
//     whatWouldYouLikeToDoPrompt()
//         .then(({ action })) => {
//             .then
//     switch (action) {
//         // case "Exit the application":
//         //     return process.exit();
//         case "View All Employees":
//             return departments.getAllDepartmentsNames();
//         case "View All Roles":
//             return roles.getAllRoleNames();
//         case "Add a Department":
//             return departments.addNewDepartment();
//         case "Add a Role":
//             return roles.addNewRole();
//         case "Add an Employee":
//             return employees.addNewEmployee();
//         case "Update an Employee Role":
//             return employees.updateRole();
//     }
// }
// }

// should I rename function questions to const whatWouldYouLikeToDoPrompt
// const interactWithUser = () => {
//     whatWouldYouLikeToDoPrompt()

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
        SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", roles.title AS "Job Title", departments.name AS "Department", FORMAT(roles.salary, 'C') Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
        FROM employees e
        LEFT JOIN roles ON e.roles_id = roles.id 
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees m ON e.manager_id = m.id;`
    connection.query(query, function (err, results) {
        if (err) throw err
        console.log('All Employees \n')
        console.table(results)
        promptUserAction()
    })
};

// View All Departments
getDepartmentsNames();

// View All Roles
getRoleNames();

// Add a Department
addNewDepartment();

// Add a Role
addNewRole();

// Add an Employee
addNewEmployee();

// Update an Employee Role
updateRole();

//*************************************
// ******** Employee routes **********
//*************************************
// Get all employees and their role affiliation
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
        AS party_name
        FROM candidates
        LEFT JOIN parties
        ON candidates.party_id = parties.id`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get single employee with role
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
        AS party_name
        FROM candidates
        LEFT JOIN parties
        ON candidates.party_id = parties.id
        WHERE candidates.id = ? `;
    const params = [req.params.id];
    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Create an employee
app.post('/api/candidate', ({ body }, res) => {
    // employee is allowed not to have a manager
    const errors = inputCheck(body, 'first_name', 'last_name', 'role');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates(first_name, last_name, role, manager_id)
        VALUES(?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected, body.party_id];
    // function,not arrow, to use this
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: body,
            id: this.lastID
        });
    });
});

// Update an employee's role
app.put('/api/candidate/:id', (req, res) => {
    // Employee is allowed to not have manager
    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE candidates SET party_id = ?
            WHERE id = ? `;
    const params = [req.body.party_id, req.params.id];
    // function,not arrow, to use this
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: req.body,
            changes: this.changes
        });
    });
});

// Delete an employee
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ? `;
    const params = [req.params.id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }

        res.json({ message: 'successfully deleted', changes: this.changes });
    });
});


//*************************************
// ******** Roles routes **********
//*************************************
// Get all roles
app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get single role
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ? `;
    const params = [req.params.id];
    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Delete a role
app.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ? `;
    const params = [req.params.id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }

        res.json({ message: 'successfully deleted', changes: this.changes });
    });
});

// Default response for any other request(Not Found) Catch all other
app.use((req, res) => {
    res.status(404).end();
});

// run questions function
questions();