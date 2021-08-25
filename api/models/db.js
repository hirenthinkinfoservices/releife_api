const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: '192.168.64.3',
    user: 'username',
    port: '3306',
    password: 'password',
    database: 'reliefe_app'
});

module.exports = connection;