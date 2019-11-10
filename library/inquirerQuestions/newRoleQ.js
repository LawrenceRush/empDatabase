const inquirer = require("inquirer")

var newRole = (roles) =>{

   

return inquirer
  
.prompt([
    {
      type: 'list',
      name: 'choice',
      message: "Whats the new role?",
      choices: roles
    },
  
  ])
 
}


module.exports = newRole;