const { json } = require("body-parser");
const sql = require("mysql2")

var mySqlConnection =sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'internee_management',
    });

   mySqlConnection.connect((err)=>{
        if(err){
            console.log("db is not connected err occurs"+err);
        }
        else{
            console.log("db is connected");
        }
    })
  
    module.exports = mySqlConnection ;