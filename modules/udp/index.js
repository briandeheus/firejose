var carton  = require('carton');
var udpPort = carton.cfg.get('udp.port');
var dgram   = require("dgram");
var server  = dgram.createSocket("udp4");



exports.name   = 'udp';
exports.server = server;
exports.init   = function (cb) {

	carton.logger.verbose('Setting up UDP server');

	server.on("listening", function () {

		carton.logger.verbose('UDP server now listening on port', udpPort);
 		cb();

	});

	server.bind(udpPort);

};