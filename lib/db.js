const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "34.128.89.141",
    user: "root",
    database: "api_backend",
    password: "password",
})

connection.connect();
module.exports = connection;