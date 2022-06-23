/**
 * Node js server setup
 */
var express = require('express');
var server = express();
server.listen(8080);
server.set('view-engine', 'ejs');

// create BODY PARSER
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

server.use(urlencodedParser);

/**
 * Process HTTP Requests
 */

//import different routes
const iquote = require('./iquote/iquote_router.js');
const weatherblog = require('./weablog/weablog_router.js');

//iquote
server.use(iquote);
server.use(weatherblog);