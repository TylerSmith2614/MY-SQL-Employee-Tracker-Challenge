const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,

    // MySQL password
    password: process.env.DB_PASSWORD,
    database: "tspapercompany_db",
  },
  console.log(`Connected to the courses_db database.`)
);

// Function to open Tyler Smith's Paper Company Employee Tracker Application
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message:
        "Welcome to the database for Tyler Smith's Paper Company.  What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then((responses) => {
      switch (responses.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
      }
    });
}

init();

// View all departments
function viewAllDepartments() {
  db.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart the application
    init();
  });
}
