// dependency
var express = require('express');

// create app and bind to server
var app = express();
var server = require('http').createServer(app);

// piggyback socket on http server
var io = require('socket.io').listen(server);

// local dependencies
var errors = require('./middleware/errors');
var routes = require('./controllers/routes')(io);

// serve views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// set up middleware
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.static(__dirname + '/static'));
app.use(express.errorHandler({thowStack: true, dumpExceptions: true}));
app.use(errors.pageNotFound);

// routes
app.get('/', routes.index);
app.get('/ajax/zipcode', errors.protectAjax, routes.storeQueryHandler);
