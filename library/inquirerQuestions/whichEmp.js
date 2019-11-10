const inquirer = require("inquirer")

var whichEmp = (emps) =>{

   

return inquirer
  
.prompt([
    {
      type: 'list',
      name: 'choice',
      message: "Which Employee?",
      choices: emps
    },
  
  ])
 
}


module.exports = whichEmp;