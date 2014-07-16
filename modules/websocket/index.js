var carton   = require('carton');
var Server   = require('ws').Server;
var wsPort   = carton.cfg.get('ws.port');
var wss      = new Server({port: wsPort});

exports.server  = wss;
exports.name    = 'websocket';
