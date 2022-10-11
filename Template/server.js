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
        "View All Departments",
        "Add Department",
        "Quit Application"
      ]},
    ])
    // SWITCH STATEMENT THAT DIRECTS THE USER TO PROPER FUNCTION / "TRAFFIC CONTROL GUY"
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
        case "View All Departments":
        viewDepartments()
        break;
        case "Add Department":
        
        break;
        case "Quit Application":
        quit()
        break;
    
      default:
        console.error("Something went wrong!")
        break;
    }
    
  } 
 
  function backToHome () {
    startApplication()
  };
  

  async function viewEmployees () {
    const roster = await db.promise().query('SELECT * FROM employee')
    console.table(roster[0])
    await inquirer.prompt({
      message: "Hit enter to go back to homepage!",
      type: "input",
      name: "pause"
    })
    backToHome()
  };

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


  async function rolePrompt () {
      const newRole = await inquirer.prompt([
      {
          type: 'input',
          message: 'What is the name of the role?',
          name: 'role_id'
      },
      {
          type: 'input',
          message: 'What is the salary of the role?',
          name: 'salary'
      },
      {
          type: 'input',
          message: 'Which deparetment does this role belong to?',
          name: 'department'
      }
    ]);
  
   }

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
      db.query(`
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${employeeInfo.firstName}', '${employeeInfo.lastName}', ${employeeInfo.employeeRole}, ${employeeInfo.managerName})
      `)
      backToHome();
   };

    async function updateEmployee () {
      const list = await db.promise().query('SELECT * FROM employee');
      console.table(list[0]);
      const memberID = await inquirer.prompt([
      {
          type: 'input',
          message: 'Enter the ID of the employee you wish to update',
          name: 'id'
      }]);
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

// TO DO: ADD ROLE & ADD DEPARTMENT 
// TO DO: ADD QUERIES TO SHOW (LOOK UP: CONCAT, FROM, JOINS, ORDER)
// TO DO: PROPERLY COMMENT CODE
// TO DO: PROPERLY WALK THROUGH CODE IN VIDEO SUBMISSION