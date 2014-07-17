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

		icon.onclick = function () {

			if (hidden) {

				iconMenu.style.display = 'block';
				hidden = false;

			} else {

				iconMenu.style.display = 'none';
				hidden = true;

			}
			
			onupdate(document.querySelector('input[name="' + name + '"]:checked').value);

		}

		return wrapper;

	}

	var Charts = function (container) {

		this._theContainer = container;
		this._allCharts    = {};

	}

	Charts.prototype.update = function (name, timestamp, value) {

		if (this._allCharts[name]) {

			if (this._allCharts[name].val === false) {

				return this._allCharts[name].val = parseFloat(value);

			}

			console.log(this._allCharts[name].val);
			
			this._allCharts[name].val += parseFloat(value);

			if (this._allCharts[name].type === 'avg') {

				this._allCharts[name].val = this._allCharts[name].val / 2;

			}
			

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
		var title     = makeNode('div', 'chartTitle');
		var titleText = makeNode('span', null, name, { contentEditable: true });

		wrapper.appendChild(y_axis);
		wrapper.appendChild(chart);

		var menuWrapper = makeNode('div', 'menu');
		var flaskButton = makeFormulaIcon(name, function (newType) {

			console.log('Changing type to:', newType);
			that._allCharts[name].type = newType;

		});


		menuWrapper.appendChild(flaskButton);

		title.appendChild(titleText);
		title.appendChild(menuWrapper);

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

			seriesData.push({ x: Date.now() / 1000, y: that._allCharts[name].val });

			if (seriesData.length > maxData) {

				seriesData.splice(0, 1);

			}

			that._allCharts[name].val = false;
			graph.update();

		}, interval);

	
		
		this._allCharts[name] = {};

		this._allCharts[name].graph = graph;
		this._allCharts[name].val   = false;
		this._allCharts[name].type  = 'avg';
		
	}

	window.Charts = Charts;

}(window));