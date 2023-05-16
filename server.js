const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL login,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "tspapercompany_db",
  },
  console.log(`Connected to the courses_db database.`)
);
// allows call back code to work with promises
const util = require("util");
db.query = util.promisify(db.query);

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

// Function to view all departments
// async function is label that lets javascript know the keyword await. try catch is a strategy for finding errors.
async function viewAllDepartments() {
  try {
    const res = await db.query("SELECT * FROM department");
    console.table(res);
    init();
  } catch (error) {
    console.log(error);
  }
}

// Call back function way to code the function.
// function viewAllDepartments() {
//   db.query("SELECT * FROM department", (err, res) => {
//       if (err) console.log(err)
//       console.table(res);
//     init();
//   })};

// Function to view all Roles
async function viewAllRoles() {
  try {
    const res = await db.query(
      "SELECT roles.title, roles.id, department.department_name, roles.salary FROM roles join department on roles.department_id = department.id"
    );
    console.table(res);
    init();
  } catch (error) {
    console.log(error);
  }
}

// Function to view all Employees
async function viewAllEmployees() {
  try {
    const res = await db.query(
      ` SELECT a.id, a.first_name, a.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM employee a
      LEFT JOIN roles r ON a.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON a.manager_id = m.id;
    `
    );
    console.table(res);
    init();
  } catch (error) {
    console.log(error);
  }
}

// Function to Add a Department
async function addDepartment() {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "DepartmentName",
        message: "What is the department name you want to add?",
      },
    ]);
    await db.query("INSERT INTO department (department_name) VALUES (?)", [
      answer.DepartmentName,
    ]);
    console.log("Your new department was added.");
    init();
  } catch (error) {
    console.log(error);
  }
}

// Function to add a Role
async function addRole() {
  // WHEN I choose to add a role
  // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the databaseasync function addRole() {
  try {
    const department = await db.query(
      "Select id as value, department_name as name FROM department"
    );
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "Title",
        message: "What is the title of the role you would like to add",
      },
      {
        type: "input",
        name: "Salary",
        message: "What is the salary for this role",
      },
      {
        type: "list",
        name: "Department",
        message: "What department does the role belong to?",
        choices: department,
      },
    ]);
    await db.query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
      [answer.Title, answer.Salary, answer.Department]
    );
    console.log("Your new role was added.");
    init();
  } catch (error) {
    console.log(error);
  }
}
// Function to add an Employee
async function addEmployee() {
  try {
    const roles = await db.query(
      "Select id as value, title as name FROM roles"
    );
    const managers = await db.query(
      "Select id as value, concat (first_name, ' ', last_name) as name FROM employee"
    );
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "FirstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "LastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roles,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: managers,
      },
    ]);

    await db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
      [answer.FirstName, answer.LastName, answer.role_id, answer.manager_id]
    );
    console.log("Your new employee was added.");
    init();
  } catch (error) {
    console.log(error);
  }
}

// Function to update an Employee Role
async function updateEmployeeRole() {
  try {
    const roles = await db.query(
      "Select id as value, title as name FROM roles"
    );
    const employees = await db.query(
      "Select id as value, concat (first_name, ' ', last_name) as name FROM employee"
    );
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Which employee are you updating?",
        choices: employees,
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's new role?",
        choices: roles,
      },
    ]);

    await db.query("UPDATE EMPLOYEE SET role_id = ? WHERE id = ?", [
      answer.role_id,
      answer.employee_id,
    ]);
    console.log("Your employee's role was updated.");
    init();
  } catch (error) {
    console.log(error);
  }
}
