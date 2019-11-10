const inquirer = require("inquirer")

var addEmpQ = (roles,departments) =>{

   

return inquirer
  
.prompt([
    {
      name: 'firstName',
      message: "What is their first name?"
    },
    {
      name: 'lastName',
      message: "What is their last name?"
    },
    {
      type: 'list',
      name: 'deparment',
      message: "Which department",
      choices: departments
    },
    {
      type: 'list',
      name: 'role',
      message: "Which role",
      choices: roles
    }
  ])
 
}


module.exports = addEmpQ;

