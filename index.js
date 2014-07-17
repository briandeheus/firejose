var carton = require('carton');

//Load configuration file
carton.cfg.load('./cfg/' + process.env.NODE_ENV + '.json');

//Load modules
carton.add(require('./modules/logger'));
carton.add(require('./modules/server'));
carton.add(require('./modules/udp'));
carton.add(require('./modules/websocket'));
carton.add(require('./modules/messageParser'));
carton.add(require('./modules/core'));

carton.add(require('carton-snor'));

carton.setup(function (error) {

	carton.logger.info('Setting up controllers');
	require('./controllers/home')

});