const initQ = require("./library/initialQ")

var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "yolo",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
 console.log("connected as id " + connection.threadId + "\n");
  startHerUp();
  
});


async function startHerUp() {
    const initialAnswer = await initQ();
    switch (initialAnswer.whatTheyWannaDo) {
        case "View Employees":
            connection.query("SELECT employees_db.employees.id, employees_db.employees.first_name, employees_db.employees.last_name, employees_db.roles.title FROM employees_db.employees INNER JOIN employees_db.roles ON employees_db.employees.role_id = employees_db.roles.id",
             function(err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                 const transformed = res.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
                 console.table(transformed);
                connection.end();
              });
            break;
        case "View Employees by Manager":
            // code block
            break;
        case "View Employees by department":
            // code block
            break;
        case "Add Employee":
            // code block
            break;
        case "Update Employee":
            // code block
            break;
        case "Update Employee Role":
            // code block
            break;
        case "Update Employee Manager":
            // code block
            break;
        case "View all roles":
            // code block
            break;
        case "View by department":
            // code block
            break;
                

        default:
        // code block
    }
}



