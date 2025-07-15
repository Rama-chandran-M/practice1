const mysql = require("mysql2");
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ramcit09',
    database:'practice1'
});
db.connect((err)=>{
    if(err) throw err;
    console.log("MySQL is Connected");
})
module.exports = db