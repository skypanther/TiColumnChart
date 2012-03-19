Column Chart for Titanium
========

A dynamic column chart for Titanium w/out web views. Works on Android and iOS. Tested with Titanium 1.8.2 and various 2.0x CI builds.

![Screenshot: TiColumnChart on iOS](https://skitch.com/skypanther/8k52s/ticolumnchart)

You must set a width & height for the chart because these values are needed to calculate the layout of various views before the chart is rendered, thus that info can't be extracted programmatically. 

```
// define our chart, height & width required, others are optional
var colchart = require('columnchart/columnchart').createChart({height:300, width: 320, top:20, left: 0});
// add top & bottom titles
colchart.addChartTopTitle('hello world');
colchart.addChartBottomTitle('goodbye world');
// add the x & y axis
colchart.addYAxis({yAxisLineColor:'black'});
	colchart.yaxis.addTick('foo 1', true);
	colchart.yaxis.addTick('foo 2', true);
	colchart.yaxis.addTick('foo 3', true);
	colchart.yaxis.addTick('foo 4', true);
colchart.addXAxis({yAxisLineColor:'black'});

// now add the columns to the chart
colchart.addColumn({barValue:50});
	colchart.columns[0].addXLabel('Foo');
colchart.addColumn({barValue:50});
	colchart.columns[1].addXLabel('Bar');
	colchart.columns[1].barValue(50);
colchart.addColumn({barColor:'red', barValue:75});
	colchart.columns[2].addXLabel('Baz');
colchart.addColumn({barColor:'red', barValue:75});
	colchart.columns[3].addXLabel('Bum');

// finally, add it to the window
win1.add(colchart.view);

// for fun, add a button to randomly change the height of the columns
var btn = Ti.UI.createButton({
	title:'Change bars',
	bottom: 10,
	width: 200,
	height: 30
});
btn.addEventListener('click', function() {
	var a = Math.floor(Math.random()*100), b = Math.floor(Math.random()*100), c = Math.floor(Math.random()*100), d = Math.floor(Math.random()*100);
	colchart.columns[0].barValue(a, {animated:true, delay: 0, duration:500});
	colchart.columns[0].changeXLabel(a+'%');
	colchart.columns[1].barValue(b, {animated:true, delay: 0, duration:300});
	colchart.columns[1].changeXLabel(b+'%');
	colchart.columns[2].barValue(c, {animated:true, delay: 0, duration:750});
	colchart.columns[2].changeXLabel(c+'%');
	colchart.columns[3].barValue(d, {animated:true, delay: 0, duration:250});
	colchart.columns[3].changeXLabel(d+'%');
});
win1.add(btn);
```

(And yep, I mixed the concepts of bars and columns so yeah barValue() should probably be columnValue() etc...)

Not fully tested, nor documented.

MIT Licensed. (c) 2012 Tim Poulsen, aka skypanther
