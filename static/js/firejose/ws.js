(function (window) {

	/**
	* Parses a message from the server
	*/
	function parseMessage(message) {
		
		var msg;

		try {
			msg = JSON.parse(message);
		} catch (e) {
			return null;	
		}

		return msg;

	}

	/**
	* Object to store timestamp of newest message
	*/
	var lastMessage = {};
	var charts      = new Charts();

	var WS = function (url) {

		var that = this;
		var ws   = new WebSocket('ws://' + url);

		ws.onmessage = function (event) {
			
			var message = that.parseMessage(event.data);
			charts.update(message.metric, message.timestamp, message.value);

		};

	}

	WS.prototype.parseMessage = function (message) {

		var message = parseMessage(message);
		var metric  = message.metric;
		var time    = message.timestamp;

		if (lastMessage[message.metric] && time > lastMessage[message.metric]) {

			lastMessage[metric] = time;
			return message;

		} else if (!lastMessage[message.metric]) {

			lastMessage[metric] = time;
			return message;

		} else {

			console.warn('Received old message:', message);

		}

	}

	window.WS = WS;

}(window));