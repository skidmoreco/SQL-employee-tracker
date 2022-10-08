// Functions that access database
const inquirer = require("inquirer");

const roster = [];

const questions = [
    {
        type: 'input',
        message: 'What would you like to do?',
        name: 'addDepartment'
    },
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name'
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






        ])
    }






