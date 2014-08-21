(function (window) {

	function makeNode(tag, className, content, params) {
  
		var f         = document.createElement(tag);
		f.className   = className;
		f.textContent = content || '';

		for (var p in params) {
			f.setAttribute(p, params[p]);
		}

		return f;

	}

	function makeIcon(type) {

		var wrapper = makeNode('div', 'item', null, { contentEditable: false });
		var icon    = makeNode('i', 'fa fa-' + type);

		wrapper.appendChild(icon);

		return wrapper;

	}

	function makeRadioSelect(id, name, value, text, checked) {

		var wrapper = makeNode('span');
		var input   = makeNode('input', 'hidden', '', {value: value, type: 'radio', name: name, id: id, checked: checked});
		var label   = makeNode('label', '', text, { 'for': id });

		wrapper.appendChild(input);
		wrapper.appendChild(label);

		return wrapper;
	}


	function makeFormulaIcon(name, onupdate) {
		
		var hidden  = true;

		var wrapper = makeNode('span', 'iconWrapper');
		var icon    = makeIcon('flask');
  
		var iconMenu = makeNode('div', 'iconMenu');

		var avg      = makeRadioSelect(name + 'frm2', name, 'avg', 'AVG', true);
		var sum      = makeRadioSelect(name + 'frm1', name, 'sum', 'SUM', false);


		wrapper.appendChild(icon);

		iconMenu.appendChild(sum);
		iconMenu.appendChild(avg);

		wrapper.appendChild(icon);
		wrapper.appendChild(iconMenu);

		var onclickFunction = function () {

			if (hidden) {

				iconMenu.style.display = 'block';
				hidden = false;

			} else {

				iconMenu.style.display = 'none';
				hidden = true;

			}
			
			onupdate(document.querySelector('input[name="' + name + '"]:checked').value);

		}

		icon.onclick = onclickFunction;
		avg.onclick  = onclickFunction;
		sum.onclick  = onclickFunction;


		return wrapper;

	}

	function getPresetValue(name, key) {

		var charts = window.globals.charts;

		console.log('checking', name, 'for', key);

		if (charts[name] && charts[name][key]) {
			return charts[name][key]
		} else {
			return false;
		}

	}

	var Chart = function (name, intervalInSeconds) {

		var that = this;

		this._series         = {};
		this._seriesData     = [];
		this._type           = getPresetValue(name, 'type') || 'avg'
		this._colors         = new Rickshaw.Color.Palette();

		this.retentionLength = window.globals.retentionLength;
		this.chart;


		//Interval is the amount in ms that we update 
		var interval = 1000 * intervalInSeconds;
		
		setInterval(function () {

			that.updateChart();
			that.chart.update();

		}, interval);

	};
 	
	Chart.prototype.hasSeries = function (name) {

		if (this._series[name]) {
			return true;
		}

		return false;
	}

 	Chart.prototype.updateChart = function () {

 		for (var serie in this._series) {

 			var series     = this._series[serie];
 			var seriesData = this._seriesData[series.index].data;

			seriesData.push({ x: Date.now() / 1000, y: series.value });

			if (seriesData.length > this.retentionLength) {

				seriesData.splice(0, 1);

			}

			series.value = null;

 		}

 	}

 	Chart.prototype.addSeries = function (name) {

 		var index = this._seriesData.length;

 		//Save the index for pushing data into the right series.
 		this._series[name]       = {};
 		this._series[name].data  = [];
 		this._series[name].value = null;
 		this._series[name].color = this._colors.color();
 		this._series[name].index = index;

		var now        = Math.floor(Date.now() / 1000);

		var i = this.retentionLength;

		while (i--) {

			this._series[name].data.push({x: now - i, y: 0 });

		}

		this._seriesData.push(

			{
				name: name,
				data: this._series[name].data,
				color: this._series[name].color
			}

		);

		console.log(this.highlighter);
		this.legend.render();


 	};

 	Chart.prototype.update = function (name, value) {

 		if (this._series[name].value === null) {

			this._series[name].value = parseFloat(value);
			return;

		}
		
		this._series[name].value += parseFloat(value);

		if (this._type === 'avg') {

			this._series[name].value = this._series[name].value / 2;

		}

		console.log(this._type, this._series[name].value);

 	}

	Chart.prototype.create = function (name, intervalInSeconds, parent) {

		var that      = this;
		var legend    = makeNode('div', 'legend');
		var container = makeNode('div', 'chartContainer');
		var wrapper   = makeNode('div', 'chartWrapper');
		var y_axis    = makeNode('div', 'y_axis');
		var chart     = makeNode('div', 'chart');
		var title     = makeNode('div', 'chartTitle');
		var titleText = makeNode('span', null, getPresetValue(name, 'name') || name, { contentEditable: true });

		wrapper.appendChild(y_axis);
		wrapper.appendChild(chart);

		var menuWrapper = makeNode('div', 'menu');
		var flaskButton = makeFormulaIcon(name, function (newType) {

			console.debug('Changing type to:', newType);
			that._type = newType;

		});


		menuWrapper.appendChild(flaskButton);

		title.appendChild(titleText);
		title.appendChild(menuWrapper);

		container.appendChild(title);
		container.appendChild(wrapper);
		container.appendChild(legend);

		this.chart = new Rickshaw.Graph({

			element: chart,
			width:   400,
			height:  200,
			renderer: 'line',
			series: this._seriesData

		});

		var x_axis = new Rickshaw.Graph.Axis.Time( { 
			graph: this.chart,
			timeFixture: new Rickshaw.Fixtures.Time.Local()
		} );
		
		var y_axis = new Rickshaw.Graph.Axis.Y({
				graph: this.chart,
				orientation: 'left',
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
				element: y_axis
		});

		this.legend = new Rickshaw.Graph.Legend({
	        element: legend,
	        graph: this.chart
		});

		this.highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
		    graph: this.chart,
		    legend: this.legend
		});

		this.shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
		    graph: this.chart,
		    legend: this.legend
		});

		parent.appendChild(container);
		this.chart.render();

	};

	window.Chart = Chart;

}(window));