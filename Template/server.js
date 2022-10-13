// Variables
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/connection");
const mysql = require("mysql2");
const consoleTable = require("console.table");


// Getting application started & initializing starter questions.
async function startApplication () {
const logoText = logo({ name: "Employee Manager" }).render();
console.log(logoText);
const starterQuestions = await inquirer.prompt([
  {
      type: 'list',
      message: 'What would you like to do?',
      name: 'choice',
      choices: [
        "Add Employee",
        "View Employees",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "Add Department",
        "View All Departments",
        "Quit Application"
      ]},
    ])
    // SWITCH STATEMENT THAT DIRECTS THE USER TO PROPER FUNCTION 
    switch (starterQuestions.choice) {
      case "Add Employee":
        employeePrompt()
        break;
        case "View Employees":
        viewEmployees()
        break;
        case "Update Employee Role":
        updateEmployee()
        break;
        case "View All Roles":
        viewRoles()
        break;
        case "Add Role":
        rolePrompt()
        break;
        case "Add Department":
        addDepartment()
        break;
        case "View All Departments":
        viewDepartments()
        break;
        case "Quit Application":
        quit()
        break;
    
      default:
        console.error("Something went wrong!")
        break;
    }
    
  };
 
  function backToHome () {
    startApplication()
  };
  // Asynchronous function that allows the user to add a department to the database.
  async function addDepartment () {
    const departmentInfo = await inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'dName'
      }
    ]);
    await db.promise().query(`INSERT INTO department (department_name) VALUES ('${departmentInfo.dName}')`)
    backToHome();
  }

  // Asynchronous function that allows the user to add an employee to the database.
  async function employeePrompt () {
    const employeeInfo = await inquirer.prompt([
    {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'lastName'
    },
    {
        type: 'input',
        message: 'What is the employees role?',
        name: 'employeeRole'
    },
    {
        type: 'input',
        message: 'Who is the employees manager?',
        name: 'managerName'
    }
    ]);
    //Using the db.query method this allows the information that was inputted into the application to be added to the employee table
    db.query(`
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${employeeInfo.firstName}', '${employeeInfo.lastName}', ${employeeInfo.employeeRole}, ${employeeInfo.managerName})
    `)
    backToHome();
 }


 // Asynchronous function that allows the user to view all employees currently in the database
  async function viewEmployees () {
    const roster = await db.promise().query(`SELECT e.role_id AS ID, e.first_name AS First, e.last_name AS Last, e.manager_id AS Manager, r.salary AS Salary, r.title AS Title, d.department_name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id`)
    console.table(roster[0])
    await inquirer.prompt({
      message: "Hit enter to go back to homepage!",
      type: "input",
      name: "pause"
    })
    //Allows the user to select enter and be taken back to the homepage.
    backToHome();
  };
  
  // Asynchronous function that allows the user to view all roles currently stored in the database.
  async function viewRoles() {
    const roles = await db.promise().query('SELECT * FROM roles')
    console.table(roles[0])
    await inquirer.prompt({
      message: "Hit enter to go back to homepage!",
      type: "input",
      name: "pause"
    })
    backToHome()
  };

  // Asynchronous function that allows the user to view all departments currently stored in the database.
  async function viewDepartments() {
    const department = await db.promise().query('SELECT * FROM department')
    console.table(department[0])
    await inquirer.prompt({
      message: "Hit enter to go back to homepage!",
      type: "input",
      name: "pause"
    })
    backToHome()
  };

// Asynchronous function that allows the user to add a role to the database.
  async function rolePrompt () {
      const newRole = await inquirer.prompt([
      {
          type: 'input',
          message: 'What is the name of the role?',
          name: 'roleId'
      },
      {
          type: 'input',
          message: 'What is the salary of the role?',
          name: 'salary'
      },
      {
          type: 'input',
          message: 'Which department does this role belong to?',
          name: 'department'
      }
    ]);
      await db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ('${newRole.roleId}', ${newRole.salary}, '${newRole.department}')`)
      backToHome();
   }
  
    // Asynchronous function that allows the user to update a specific employee based on the employees ID.
    async function updateEmployee () {
      const list = await db.promise().query('SELECT * FROM employee');
      console.table(list[0]);
      const memberID = await inquirer.prompt([
      {
          type: 'input',
          message: 'Enter the ID of the employee you wish to update',
          name: 'id'
      }]);

      //Once the user has selected the specific employee, this allows the user to update all information about the employee that was selected.
      const employee = await db.promise().query(`SELECT * FROM employee WHERE id=${memberID.id}`)
      const updatedInfo = await inquirer.prompt([
          {
            type: 'input',
            message: 'Employee First Name',
            name: 'fName',
            default: `${employee[0][0].first_name}`
          },
          {
            type: 'input',
            message: 'Employee Last Name',
            name: 'lName',
            default: `${employee[0][0].last_name}`
          },
          {
            type: 'input',
            message: 'Role ID',
            name: 'rId',
            default: `${employee[0][0].role_id}`
          },
          {
            type: 'input',
            message: 'Manager ID',
            name: 'mId',
            default: `${employee[0][0].manager_id}`
          }
      ])
      await db.promise().query(`
      UPDATE employee 
      SET first_name='${updatedInfo.fName}', last_name='${updatedInfo.lName}', role_id=${updatedInfo.rId}, manager_id=${updatedInfo.mId} 
      WHERE id=${memberID.id}`)
     
      backToHome();
    };



    
// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}

startApplication();

// TO DO: PROPERLY WALK THROUGH CODE IN VIDEO SUBMISSION