var connection = require('./dbconnect');

function get_dbinfo(querystring, callback) {

    connection.query(querystring, function (err, rows, cols) {
        if (err)
            throw err;

        return callback(rows);
    });

}

exports.get_dbinfo = get_dbinfo;
