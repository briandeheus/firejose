var carton    = require('carton');
var chartData = carton.cfg.get('charts');
var snor      = carton.snor;
var server    = carton.server.methods;

server.get('/', function (req, res) {

	var view = snor.make('home/home', ['global/partials/header', 'global/partials/footer'], {

		title: 'Firejose',
		charts: JSON.stringify(chartData)

	});
	
	res.send(view);

});