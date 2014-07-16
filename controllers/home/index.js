var carton = require('carton');
var snor   = carton.snor;
var server = carton.server.methods;

server.get('/', function (req, res) {

	var view = snor.make('home/home', ['global/partials/header', 'global/partials/footer'], {

		title: 'Firejose'
		
	});
	
	res.send(view);

});