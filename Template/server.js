const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/connection");
const mysql = require("mysql2");
const consoleTable = require("console.table");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  // loadPrompts();
}

const starterQuestions = [

  {
      type: 'input',
      message: 'What would you like to do?',
      name: 'addDepartment'
  },
  // {
  //     type: 'input',
  //     message: 'What is the name of the department?',
  //     name: 'name'
  // },
  {
    type: 'input',
    message: 'What would you like to do?',
    name: 'addRole'
}
]

  function servicePrompt () {
      inquirer.prompt(questions).then(response => {
          const service = new Service(response.addDepartment, response.name)
          roster.push(service)
          addPrompt();
      })
  }

  function rolePrompt () {
      inquirer.prompt([
      {
          type: 'input',
          message: 'What would you like to do?',
          name: 'addRole'
      },
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
      ]).then((response) => {
          const roles = new Role(response.addRole, response.role_id, response.salary, response.department)
          roster.push(roles);
          addPrompt();
      })
   }

   function employeePrompt () {
      inquirer.prompt([
      {
          type: 'input',
          message: 'What would you like to do?',
          name: 'addEmployee'
      },
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
      ]).then((response) => {
          const employee = new Employee(response.firstName, response.lastName, response.employeeRole, response.managerName)
          roster.push(employee);
          addPrompt();
      })
   }

   function updateEmployee () {
      inquirer.prompt([
      {
          type: 'input',
          message: 'What would you like to do?',
          name: 'updateRole'
      },
      {
          type: 'input',
          message: 'Which employees role do you want to update?',
          name: 'employeeList'
      }
      ]).then((response) => {
          const update = new Update(response.updateRole, response.employeeList)
          roster.push(update)
          addPrompt();
      })
   }
   function init() {
      addPrompt()
   };


// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
