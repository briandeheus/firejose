exports.name = 'messageParser';

exports.parse = function (message) {

	message = message.split(':');
	return {
		timestamp: message[0],
		metric: message[1],
		value: message[2]
	};

};