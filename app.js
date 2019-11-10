const initQ = require("./library/inquirerQuestions/initialQ")
const addEmpQ = require("./library/inquirerQuestions/addEmployeeQ")
const whichEmpQ = require("./library/inquirerQuestions/whichEmp")
var mysql = require("mysql");
var inquirer = require("inquirer")
const newRoleQ = require("./library/inquirerQuestions/newRoleQ")
const newDepQ = require("./library/inquirerQuestions/newDep")

const util = require('util');


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

const query = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startHerUp();

});


async function startHerUp() {
    const initialAnswer = await initQ();
    switch (initialAnswer.whatTheyWannaDo) {
        case "View Employees":
            connection.query("SELECT employees_db.employees.id, employees_db.employees.first_name, employees_db.employees.last_name, employees_db.roles.title FROM employees_db.employees INNER JOIN employees_db.roles ON employees_db.employees.role_id = employees_db.roles.id",
                function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    const transformed = res.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {})
                    console.table(transformed);
                    startHerUp()
                });
            break;
        case "View Employees by Manager":
                try {
                    const empByManager = await query("SELECT A.first_name AS First_Name, A.last_name AS Last_Name, A.manager_id as Manager_Id, B.first_name as Manager_First_Name, B.last_name AS Manager_Last_Name FROM employees_db.employees A, employees_db.employees B WHERE A.manager_id = B.id");
                    
                    console.table(empByManager);
                  } finally {
                    startHerUp()
                  }
               
            break;
        case "View Employees by department":
                try {
                    const empByDep = await query("SELECT e.id, e.first_name, e.last_name,  r.department_id, d.name FROM employees_db.employees AS e INNER JOIN employees_db.roles AS r ON e.role_id = r.id INNER JOIN employees_db.departments AS d ON r.department_id = d.id Order BY d.id");
                    
                    console.table(empByDep);
                  } finally {
                    startHerUp()
                  }
            break;
        case "Add Employee":
        //Get all the roles to pass into an inquirer prompt 
        connection.query("SELECT * FROM employees_db.roles",
        function(err, res){
            let rolesArr = []
            for (let i = 0; i < res.length; i++){
                rolesArr.push(res[i].title)
            } 
            
            connection.query("SELECT * FROM employees_db.departments;",
            async function(err, res){
            let departmentsArr = []
            for (let i = 0; i < res. length; i++){
                departmentsArr.push(res[i].name)
            }
            let emp2add = await addEmpQ(rolesArr, departmentsArr)
            connection.query(
                "INSERT INTO employees SET ?",
                {
                  first_name: emp2add.firstName,
                  last_name: emp2add.lastName,
                  role_id: 1,
                },
                function(err) {
                  if (err) throw err;
                  console.log("Your auction was created successfully!");
                  // re-prompt the user for if they want to bid or post
        }
        
        )
        
        startHerUp();
    
})}
        )
            break;
        case "Update Employee":
                
                try {
                    let emps = await query("SELECT * FROM employees_db.employees;");
                    let nameArray = [];
                        for (let i = 0; i < emps.length; i++) {
                            nameArray[i] = `${emps[i].first_name} ${emps[i].last_name}`
                        }
                    let emp2Update = await whichEmpQ(nameArray)
                    var emp2UpdateNameArray = emp2Update.choice.split(" ")
                    let roles = await query("SELECT * FROM employees_db.roles");
                    let rolesArr = []
                    for (let i = 0; i < roles.length; i++){
                    rolesArr.push(roles[i].title)
                    } 
                    let deps = await query("SELECT * FROM employees_db.departments;")
                    let depsArr = []
                    for (let i = 0; i < deps.length; i++){
                        depsArr.push(deps[i].name)
                        } 
                    console.log(emp2UpdateNameArray);
                    console.log(rolesArr)
                    console.log(depsArr)
                    let querysetUp = await addEmpQ(rolesArr, depsArr);
                    console.log(querysetUp)
                    let updater = await connection.query("UPDATE employees_db.employees SET first_name = ?, last_name = ? WHERE first_name = ? AND last_name = ? ;",[querysetUp.firstName, querysetUp.lastName, emp2UpdateNameArray[0], emp2UpdateNameArray[1]])
                    startHerUp()
                  } finally {
                    //connection.end();
                  }
               
             
                
            break;
        case "Update Employee Role":
            let emps2 = await query("SELECT * FROM employees_db.employees;");
                    let nameArray = [];
                        for (let i = 0; i < emps2.length; i++) {
                            nameArray[i] = `${emps2[i].first_name} ${emps2[i].last_name}`
                        }
                    let emp2Update = await whichEmpQ(nameArray);
                    var emp2UpdateNameArray = emp2Update.choice.split(" ")
                    let roles = await query("SELECT * FROM employees_db.roles");
                    let rolesArr = []
                    for (let i = 0; i < roles.length; i++){
                        rolesArr.push(roles[i].title)
                        } 
                    let newRole =await newRoleQ(rolesArr)
                    
                    let newRoleId = await query("SELECT * FROM employees_db.roles WHERE employees_db.roles.title  = ? ;",[newRole.choice])
                    let updater = await connection.query("UPDATE employees_db.employees SET role_id = ? WHERE first_name = ? AND last_name = ? ;",[newRoleId[0].id, emp2UpdateNameArray[0], emp2UpdateNameArray[1]])
                    console.log('Employee updated')
                    startHerUp();
            break;
        case "View all roles":
                let roles2 = await query("SELECT * FROM employees_db.roles");
                console.table(roles2)
            break;
        


        default:
        // code block
    }
}

// function rolesSwitch(roleName){
// switch (roleName){
//     case "Manager":
//     return 1
//     break;
//     case "Programmer":
//     return 2
//     break;
//     case "Tester":
//     return 3
//     break;
//     case "Technical Consultant":
//     return 4
//     break;
//     case "Graphical Artist":
//     return 6
//     break;
//     case "Concept Artists":
//     return 7
//     break;
//     case "It Expert":
//     return 9
//     break;
//     case "Technical Support":
//             return 10
//     break;
//     case "Project Lead":
//             return 11
//     break;
//     case "Creative Director":
//         return 12
//     break;
//     case "Lead Writer":
//         return 13
//     break;
//     case "Marketer":
//     return 14
//     break;
//     case "Secretary":
//     return 15
//     break;
//     case "CEO":
//     return 16
//     break;
//     case "Assistant":
    
//     break;
// }
// }



