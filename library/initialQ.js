const inquirer = require("inquirer")

var initQ = () =>{

return inquirer
  
.prompt([
    {
      type: "list",
      name: 'whatTheyWannaDo',
      message: "What would you like to do?",
      choices: ["View Employees", "View Employees by Manager", "View Employees by department",
       "Add employee", "Update employee", "Update Employee Mananger",
    "Update Employee Role", "View all roles", "View all departments"]
    },
  ])
 
}

module.exports = initQ;

