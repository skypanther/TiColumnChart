// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
if(Ti.Platform.osname=='android') {
	win1.windowPixelFormat = Ti.UI.Android.PIXEL_FORMAT_RGBA_8888;
}
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});


// define our chart, passing optional display params
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
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
