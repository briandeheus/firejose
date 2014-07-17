(function (window) {

	function makeNode(tag, className, content) {
  
		var f         = document.createElement(tag);
		f.className   = className;
		f.textContent = content || '';

		if (className === 'chartTitle') {
			f.setAttribute("contentEditable", true);
		}

		return f;

	}


	var Charts = function (container) {

		this._theContainer = container;
		this._allCharts    = {};

	}

	Charts.prototype.update = function (name, timestamp, value) {

		if (this._allCharts[name]) {

			if (this._allCharts[name].avg === false) {

				return this._allCharts[name].avg = parseFloat(value);

			}

			this._allCharts[name].avg += parseFloat(value);
			this._allCharts[name].avg = this._allCharts[name].avg / 2;

		} else {

			this.create(name, 1);
			this.update(name, timestamp, value);

		}

	}

	Charts.prototype.create = function (name, intervalInSeconds) {

		var that      = this;
		var parent    = document.getElementById('chartContainer');
		var container = makeNode('div', 'chartContainer');
		var wrapper   = makeNode('div', 'chartWrapper');
		var y_axis    = makeNode('div', 'y_axis');
		var chart     = makeNode('div', 'chart');
		var title     = makeNode('div', 'chartTitle', name);

		wrapper.appendChild(y_axis);
		wrapper.appendChild(chart);

		container.appendChild(title);
		container.appendChild(wrapper);

		var seriesData = [];
		var maxData    = 500;
		var now        = Math.floor(Date.now() / 1000);

		var i = maxData;
		var j = 0;

		while (i--) {

			seriesData.push({x: now - i, y: 0 });

		}

		var graph = new Rickshaw.Graph({

			element: chart,
			width:   600,
			height:  200,
			renderer: 'line',
			series: [{

				data: seriesData,
				color: 'rgb(229, 132, 132)'

			}]

		});

		var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );
		var y_axis = new Rickshaw.Graph.Axis.Y({
				graph: graph,
				orientation: 'left',
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
				element: y_axis
		});


		//Push chart into document.
		parent.appendChild(container);
		graph.render();

		//Interval is the amount in ms that we update 
		var interval = 1000 * intervalInSeconds;
		var now      = Date.now();

		setInterval(function () {

			seriesData.push({ x: Date.now() / 1000, y: that._allCharts[name].avg });

			if (seriesData.length > maxData) {

				seriesData.splice(0, 1);

			}

			that._allCharts[name].avg = false;
			graph.update();

		}, interval);

	
		

		this._allCharts[name] = {
			graph: graph,
			avg: 0
		};

	}

	window.Charts = Charts;

}(window));