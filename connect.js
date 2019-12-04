const mysql = require("mysql");

    const connection =  mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "game",
        password: ""
    });
    module.exports = connection;


