/*
	barchart.js
	Titanium, cross-platform bar and column charting module

*/
var defaults = {
	height: 400,
	width: 320,
	backgroundColor: 'transparent',
	foregroundColor: 'black',
	borderColor: 'black',
	borderRadius: 4,
	labelTextColor: 'black',
	fontFamily: 'Helvetica Neue',
	tickColor:'black',
	tickHeight:30,
	tickWidth:60,
	tickFontSize: 12,
	barColor: 'blue',
	barBGGraphic: '/columnchart/gradient1.png',
	barWidth: 80,
	barSpacing: 4,
	yAxisWidth: 60,
	yAxisLineWidth: 2,
	xAxisHeight: 40,
	xLabelColor: 'black',
	xAxisLineWidth: 2,
	xLabelHeight: 40
};

// Helpers for top & bottom titles
function createChartTopTitle(text) {
	return Ti.UI.createLabel({
		height:defaults.xLabelHeight,
		width:'100%',
		top:0,
		color:defaults.labelTextColor,
		text:text||'',
		font:{
			fontFamily:defaults.fontFamily,
			fontWeight:'bold'
		},
		textAlign:'center',
		zIndex:15
	});
}
function createChartBottomTitle(text) {
	return Ti.UI.createLabel({
		height:defaults.xLabelHeight,
		width:'100%',
		bottom: 0,
		color:defaults.labelTextColor,
		text:text,
		font:{
			fontFamily:defaults.fontFamily,
			fontWeight:'bold'
		},
		textAlign:'center',
		zIndex:15
	});
}

// Axis helpers
// Y-axis
function createYAxis(params) {
	if(typeof params == 'undefined') var params = {};
	var bottomOffset = parseInt((params.xLabelHeight) ? params.xLabelHeight : defaults.xLabelHeight)*2;
	bottomOffset -= ((params.xAxisLineWidth) ? params.xAxisLineWidth : defaults.xAxisLineWidth);
	var yAxisWrapper = Ti.UI.createView({
		width:(params.yAxisWidth) ? params.yAxisWidth : defaults.yAxisWidth,
		left: 0,
		top: (params.xLabelHeight) ? params.xLabelHeight : defaults.xLabelHeight,
		bottom: bottomOffset,
		height:'auto',
		backgroundColor:'transparent'
	});
	var yAxisLine = Ti.UI.createView({
		width:(params.yAxisLineWidth) ? params.yAxisLineWidth : defaults.yAxisLineWidth,
		height:'100%',
		right:0,
		top:0,
		backgroundColor:(params.yAxisLineColor) ? params.yAxisLineColor : 'black'
	});
	yAxisWrapper.add(yAxisLine);
	
	var yAxis = {
		view: yAxisWrapper,
		ticks: [],
		repositionTicks: function() {
			for(var i=0,j=this.ticks.length;i<j;i++) {
				//Ti.API.info('tick '+i+ ' top: ' + Math.ceil(this.view.size.height / j * i))
				this.ticks[i].top = Math.floor(100/this.ticks.length * i) + '%';
			}
		},
		addTick: function(text, showTick) {
			// create a view wrapper
			var tickView = Ti.UI.createView({
				width: (params.yAxisWidth) ? params.yAxisWidth : defaults.yAxisWidth,
				height: (params.tickHeight) ? params.tickHeight : defaults.tickHeight,
				backgroundColor:'transparent',
				right:0,
				top:0,
				left: 0
			});
			// create the tick mark if applicable
			if(showTick) {
				var tickLine = Ti.UI.createView({
					width:10,
					height:2,
					right:0,
					top:'49%',
					backgroundColor: (params.tickColor) ? params.tickColor: defaults.tickColor
				});
				tickView.add(tickLine);
			}
			// add the label
			var tickLabel = Ti.UI.createLabel({
				text:text,
				color: (params.color) ? params.color: defaults.labelTextColor,
				right:13,
				top:'5%',
				bottom:'5%',
				width:'90%',
				font: {
					fontSize: (params.fontSize) ? params.fontSize : defaults.tickFontSize
				},
				textAlign:'right'
			});
			tickView.add(tickLabel);
			this.ticks.push(tickView);
			this.view.add(tickView);
			this.repositionTicks();
		}
	};
	return yAxis;
}

// X-axis
function createXAxis(params) {
	if(typeof params == 'undefined') var params = {};
	var xAxisWrapper = Ti.UI.createView({
		width:'100%',
		height: (params.xAxisHeight) ? params.xAxisHeight : defaults.xAxisHeight,
		backgroundColor: (params.yAxisBG) ? params.yAxisBG : 'transparent',
		bottom:(params.xLabelHeight) ? params.xLabelHeight : defaults.xLabelHeight,
		left:(params.yAxisWidth) ? params.yAxisWidth : defaults.yAxisWidth,
		zIndex:10
	});
	var xAxisLine = Ti.UI.createView({
		height: (params.xAxisLineWidth) ? params.xAxisLineWidth : defaults.xAxisLineWidth,
		width:'100%',
		top:0,
		right:0,
		backgroundColor: (params.xAxisLineColor) ? params.xAxisLineColor : 'black'
	});
	xAxisWrapper.add(xAxisLine);
	var xAxis = {
		view: xAxisWrapper
	};
	return xAxis;
}

// columns
function createColumn(params) {
	if(typeof params == 'undefined') var params = {};
	var barWrapper = Ti.UI.createView({
		width:(params.barWidth) ? params.barWidth : defaults.barWidth,
		backgroundColor:'transparent',
		left: 0,
		top:(params.xLabelHeight) ? params.xLabelHeight : defaults.xLabelHeight,
		bottom:((params.xLabelHeight) ? params.xLabelHeight : defaults.xLabelHeight)+7,	
		height:'auto'
	});
	var xLabel = Ti.UI.createLabel({
		height:30,
		width:'100%',
		text: '',
		font: {
			fontSize: (params.fontSize) ? params.fontSize : defaults.tickFontSize
		},
		color: (params.xLabelColor) ? params.xLabelColor : defaults.xLabelColor,
		textAlign:'center',
		bottom:0
	});
	barWrapper.add(xLabel);
	var barBG = Ti.UI.createView({
		width:'100%',
		height: (params.barBGHeight) ? params.barBGHeight : '100%',
		backgroundColor: (params.barBGColor) ? params.barBGColor : 'transparent',
		left: 0, right: 0,
		bottom:0		
	});
	barWrapper.add(barBG);
	var bar = Ti.UI.createView({
		width:'100%',
		height: (params.barHeight) ? params.barHeight : '100%',
		backgroundColor: (params.barColor) ? params.barColor : defaults.barColor,
		backgroundImage: (params.barBGGraphic) ? params.barBGGraphic : defaults.barBGGraphic,
		borderWidth: (params.borderWidth) ? params.borderWidth : 0,
		borderColor: (params.borderColor) ? params.borderColor : 'transparent',
		left: 0, right: 0,
		bottom:32		
	});
	barWrapper.add(bar);
	
	var column = {
		view: barWrapper,
		origWidth: (params.barWidth) ? params.barWidth : defaults.barWidth,
		addTopLabel: function(text) {
			
		},
		addBGLabel: function(text) {
			
		},
		addBarLabel: function(text) {
			
		},
		addXLabel: function(text) {
			xLabel.text = text;
		},
		changeXLabel: function(text) {
			xLabel.text = text;
		},
		barValue: function(val, props) {
			var newValue = (val / 100) * defaults.maxbarheight;
			if(typeof props == 'undefined') {
				var props = {
					animated:false,
					delay: 0,
					duration: 0
				};
			}
			if(props.animated===true) {
				bar.animate({
					height: newValue,
					duration: props.duration
				});
			} else {
				bar.height = newValue;
			} // end if
		},
		changeBarWidth: function(newWidth) {
			barWrapper.width = newWidth;
			barBG.width = newWidth;
			bar.width = newWidth;
		}
	};
	return column;
}

var createChart = function(params){
	// create the main chart view
	if(typeof params == 'undefined') var params = {};
	var chartView = Ti.UI.createView({
		backgroundColor: (params.backgroundColor) ? params.backgroundColor: defaults.backgroundColor,
		width: (params.width) ? params.width : defaults.width,
		height: (params.height) ? params.height : defaults.height,
		top: (params.top) ? params.top : 0,
		left: (params.left) ? params.left : 0
	});
	// calculate the max height for the columns:
	var maxbarheight = ((params.height) ? params.height : defaults.height) - defaults.xLabelHeight*3;
	defaults.maxbarheight = maxbarheight;
	var columnWrapper = Ti.UI.createView({
		backgroundColor: 'transparent',
		bottom: 0,
		left: 0,
		top: 0,
		width: '100%',
		height: '100%'
	});
	chartView.add(columnWrapper);
	// now rig up the chart object and its methods
	var chart = {
		view: chartView,
		colWrapper: columnWrapper,
		yaxis:null,
		xaxis:null,
		columns: [],
		repositionColumns: function() {
			var chartWrapperWidth = ((params.width) ? params.width : defaults.width) - ((params.yAxisWidth) ? params.yAxisWidth : defaults.yAxisWidth);
			Ti.API.info('chartWrapperWidth = ' + chartWrapperWidth)
			var newWidth = (this.columns.length > 0) ? Math.floor(chartWrapperWidth/this.columns.length - defaults.barSpacing - defaults.yAxisLineWidth) : this.columns[0].origWidth;
Ti.API.info('Math.floor(chartWrapperWidth/this.columns.length - defaults.barSpacing) = ' + Math.floor(chartWrapperWidth/this.columns.length - defaults.barSpacing))
			Ti.API.info('newWidth / before = ' + newWidth)
			if(newWidth > this.columns[0].origWidth) {
				newWidth = this.columns[0].origWidth;
			}
			Ti.API.info('newWidth / after = ' + newWidth)
			for(var i=0,j=this.columns.length;i<j;i++) {
				this.columns[i].changeBarWidth(newWidth);
				this.columns[i].view.left = (newWidth * i + i * defaults.barSpacing); 
			}
		},
		addChartTopTitle: function(text) {
			this.view.add(createChartTopTitle(text));
		},
		addChartBottomTitle: function(text) {
			this.view.add(createChartBottomTitle(text, params));
		},
		addYAxis: function(options) {
			this.yaxis = createYAxis(options);
			this.view.add(this.yaxis.view);
			this.colWrapper.left = (this.yaxis.view.size.width) ? this.yaxis.view.size.width + 4 : (defaults.yAxisWidth + 4);
		},
		addXAxis: function(options) {
			this.xaxis = createXAxis(options);
			this.view.add(this.xaxis.view);
		},
		addColumn: function(options) {
			if(typeof options == 'undefined') var options = {};
			var col = createColumn(options);
			col.barValue((options.barValue) ? options.barValue : maxbarheight );
			this.columns.push(col);
			this.colWrapper.add(col.view);
			this.repositionColumns();
		}
	};
	return chart;
};

exports.createChart = createChart;
