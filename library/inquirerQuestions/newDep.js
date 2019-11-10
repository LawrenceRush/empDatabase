const inquirer = require("inquirer")

var newDep = (deps) =>{

   

return inquirer
  
.prompt([
    {
      type: 'list',
      name: 'choice',
      message: "Whats the new department?",
      choices: deps
    },
  
  ])
 
}


module.exports = newDep;