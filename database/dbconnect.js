var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "ch",
    password: "Ab123456?",
    database: 'webapp'
});

connection.connect(function(err) {
    if(err)
        throw err;
});

module.exports = connection;