var carton = require('carton');
var app    = require('express')();
var port   = carton.cfg.get('server.port');
var secret = carton.cfg.get('server.secret');
var server;

//Allow for nginx proxying.
app.enable('trust proxy');

//Adding middleware.
app.use(require('body-parser')());
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: secret}));
app.use(require('express').static('static', __dirname + '/static'));

exports.methods = app;
exports.name    = 'server';

exports.setup   = function (cb) {

	server = app.listen(port, cb);

	app.use(function(req, res, next){

		carton.logger.verbose('Incoming', req.method, 'request:', req.url);
		next();

	});

};


