const express = require('express');

const router = express.Router();

// create BODY PARSER
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * Section for mySQL
 */
var connection = require('../database/dbconnect');
const { get_dbinfo } = require("../database/get_dbinfo");

router.get('/webapp/iquote', (req, res) => {
    res.render('iquote.ejs');
})

router.get('/webapp/iquote/subscribed', (req, res) => {
    res.render('subscribeSuccessful.ejs');
})

router.post('/webapp/iquote/subscribe', urlencodedParser, (req, res) => {
    //parse email address from request body
    var email = req.body['email'];
    //value for subscribed is defaulted to be true
    var subscribed_default = true;

    var email_query = "SELECT * FROM iquote WHERE (email = '" + email + "');";

    get_dbinfo(email_query, function (rows) {
        //Check for repeated email address
        //if at least one instance of the same email address exists in the db
        if (rows.length == 0) {
            connection.query("INSERT INTO iquote (email, subscribed) VALUES('"
                + email + "',"
                + subscribed_default + ");", function (err, rows, cols) {
                    if (err) throw err;
                });
        }
    });

    res.redirect('/webapp/iquote/subscribed');
})

module.exports = router;