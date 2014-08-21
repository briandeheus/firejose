(function (window) {

	var Charts = function (container) {

		this._theContainer = container;
		this._allCharts    = {};

	}

	Charts.prototype.update = function (name, value) {

		var cleanName  = name.split('#')[0];
		var seriesName = name.split('#')[1] || 'default';

		if (this._allCharts[cleanName]) {

			var chart = this._allCharts[cleanName];

			if (chart.hasSeries(seriesName)) {

				chart.update(seriesName, value);

			} else {

				this._allCharts[cleanName].addSeries(seriesName);

			}
	
		} else {

			this._allCharts[cleanName] = new Chart(cleanName, 1);

			this._allCharts[cleanName].create(cleanName, 1, document.getElementById('chartContainer'));
			this._allCharts[cleanName].addSeries(seriesName);

		}

	}

	window.Charts = Charts;

}(window));