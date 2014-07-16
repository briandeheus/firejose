var carton   = require('carton');
exports.name = 'core';

exports.init = function (cb) {
	
	var parse = carton.messageParser.parse;

	carton.logger.verbose('Setting up Websocket Server.');
	var wss     = carton.websocket.server;
	var clients = [];

	function emitToClients(message) {

		for (var i = 0, l = clients.length; i < l; i++) {

			carton.logger.verbose('Sending message to client.');
			clients[i].send(message);

		}

	}

	wss.on('connection', function(ws) {

		//Push the client into clients array.
		clients.push(ws);
		//Get the index of the client for removal.
		var index = clients.lenght - 1;

		ws.on('close', function () {

			carton.logger.verbose('Client disconnected');
			clients.splice(index, 1);

		});

	});

	carton.logger.verbose('Setting up UDP listeners.');
	var udp = carton.udp.server;
	carton.udp.server.on('message', function (message, client) {

		message = parse(message.toString());
		carton.logger.verbose('Received message:', message);
		emitToClients(JSON.stringify(message));

	});

	cb();

};