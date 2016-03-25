//searchValue
var searchValue = document.querySelector(".stockSymbol").innerHTML;
var searchTicker = searchValue.slice(0, -3);
var lineColor = "";
var totalReturned = "";
var chartstuff = [];

//get today's date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if (dd<10){
    dd='0'+dd;
}
if (mm<10){
    mm='0'+mm;
}

var today = yyyy+'-'+mm+'-'+dd;

//get 1m ago date
var oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

var dd = oneMonthAgo.getDate();
var mm = oneMonthAgo.getMonth()+1;
var yyyy = oneMonthAgo.getFullYear();

if (dd<10){
    dd='0'+dd;
}
if (mm<10){
    mm='0'+mm;
}

var lastmonth = yyyy+'-'+mm+'-'+dd;

//get 3m ago date
var threeMonthAgo = new Date();
threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);

var dd = threeMonthAgo.getDate();
var mm = threeMonthAgo.getMonth()+1;
var yyyy = threeMonthAgo.getFullYear();

if (dd<10){
    dd='0'+dd;
}
if (mm<10){
    mm='0'+mm;
}

var threemonth = yyyy+'-'+mm+'-'+dd;

//get 6m ago date
var sixMonthAgo = new Date();
sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

var dd = sixMonthAgo.getDate();
var mm = sixMonthAgo.getMonth()+1;
var yyyy = sixMonthAgo.getFullYear();

if (dd<10){
    dd='0'+dd;
}
if (mm<10){
    mm='0'+mm;
}

var sixmonth = yyyy+'-'+mm+'-'+dd;

//get 1Y ago date
var oneYearAgo = new Date();
oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);

var dd = oneYearAgo.getDate();
var mm = oneYearAgo.getMonth()+1;
var yyyy = oneYearAgo.getFullYear();

if (dd<10){
    dd='0'+dd;
}
if (mm<10){
    mm='0'+mm;
}

var oneyear = yyyy+'-'+mm+'-'+dd;

//Events
$(".1D").on( "click", getChart1D );
$(".1M").on( "click", getChart1M );
$(".3M").on( "click", getChart3M );
$(".6M").on( "click", getChart6M );
$(".1Y").on( "click", getChart1Y );

//Event handler functions

// getJSON
function getChart1D() {
	event.preventDefault();

  var searchValue = document.querySelector(".stockSymbol").innerHTML;
	var searchTicker = searchValue.slice(0, -3);
	var url = "http://chartapi.finance.yahoo.com/instrument/1.0/"+searchTicker+"/chartdata;type=quote;range=1d/json";

  $.ajax({
  type: 'GET',
  url: url,
  dataType: 'jsonp',
  success: function(json) {updateHistory1D(json);}
});

  $('#input').focus();
}

function getChart1M() {
	event.preventDefault();

	var searchValue = document.querySelector(".stockSymbol").innerHTML;
	var searchTicker = searchValue.slice(0, -3);
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22"+searchTicker+"%22%20and%20startDate%20=%20%22"+lastmonth+"%22%20and%20endDate%20=%20%22"+today+"%22&format=json&env=store://datatables.org/alltableswithkeys";
	jQuery.getJSON(url, updateHistory1M);

  $('#input').focus();
}

function getChart3M() {
	event.preventDefault();

	var searchValue = document.querySelector(".stockSymbol").innerHTML;
	var searchTicker = searchValue.slice(0, -3);
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22"+searchTicker+"%22%20and%20startDate%20=%20%22"+threemonth+"%22%20and%20endDate%20=%20%22"+today+"%22&format=json&env=store://datatables.org/alltableswithkeys";
	jQuery.getJSON(url, updateHistory3M);

  $('#input').focus();
}

function getChart6M() {
	event.preventDefault();

	var searchValue = document.querySelector(".stockSymbol").innerHTML;
	var searchTicker = searchValue.slice(0, -3);
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22"+searchTicker+"%22%20and%20startDate%20=%20%22"+sixmonth+"%22%20and%20endDate%20=%20%22"+today+"%22&format=json&env=store://datatables.org/alltableswithkeys";
	jQuery.getJSON(url, updateHistory6M);

  $('#input').focus();
}

function getChart1Y() {
	event.preventDefault();

	var searchValue = document.querySelector(".stockSymbol").innerHTML;
	var searchTicker = searchValue.slice(0, -3);
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22"+searchTicker+"%22%20and%20startDate%20=%20%22"+oneyear+"%22%20and%20endDate%20=%20%22"+today+"%22&format=json&env=store://datatables.org/alltableswithkeys";
	jQuery.getJSON(url, updateHistory1Y);

  $('#input').focus();
}

//updating history array
function updateHistory1D(json) {
  obj = {};
  label = {};

  totalReturned = json.series.length;
  for (var i = 0; i < totalReturned; ++i) {
        obj["var" + (i + 1)] = Number(json.series[i].close.toFixed(2));
        label["date" + (i + 1)] = moment.unix(json.series[i].Timestamp).format('h:mm a');
        label["price" + (i + 1)] = parseFloat(Math.round(json.series[i].close * 100) / 100).toFixed(2);

    }

  if (json.series[0].close > json.series[totalReturned - 1].close) {
    lineColor = "rgb(255, 0, 108)";
  } else {
    lineColor = "rgb(26, 187, 156)";
  }

  $(".timeline a").css("color", "#586468");
  $(".1D a").css("color", lineColor);

	updateChart1D();
}

function updateHistory1M(json) {
  obj = {};
  label = {};

  totalReturned = json.query.results.quote.length;
  for (var i = 0; i < totalReturned; ++i) {
        obj["var" + (i + 1)] = Number(json.query.results.quote[i].Close);
        label["date" + (i + 1)] = moment(json.query.results.quote[i].Date).format('ll');
        label["price" + (i + 1)] = parseFloat(Math.round(json.query.results.quote[i].Close * 100) / 100).toFixed(2);
    }

  if (Number(json.query.results.quote[0].Close) < Number(json.query.results.quote[totalReturned - 1].Close)) {
    lineColor = "rgb(255, 0, 108)";
  } else {
    lineColor = "rgb(26, 187, 156)";
  }

  $(".timeline a").css("color", "#586468");
  $(".1M a").css("color", lineColor);

	updateChart1M();
}

function updateHistory3M(json) {
  obj = {};
  label = {};

  totalReturned = json.query.results.quote.length;
  for (var i = 0; i < totalReturned; ++i) {
        obj["var" + (i + 1)] = Number(Number(json.query.results.quote[i].Close).toFixed(2));
        label["date" + (i + 1)] = moment(json.query.results.quote[i].Date).format('ll');
        label["price" + (i + 1)] = parseFloat(Math.round(json.query.results.quote[i].Close * 100) / 100).toFixed(2);
    }

  if (Number(json.query.results.quote[0].Close) < Number(json.query.results.quote[totalReturned - 1].Close)) {
    lineColor = "rgb(255, 0, 108)";
  } else {
    lineColor = "rgb(26, 187, 156)";
  }

  $(".timeline a").css("color", "#586468");
  $(".3M a").css("color", lineColor);

	updateChart3M();
}

function updateHistory6M(json) {
  obj = {};
  label = {};

  totalReturned = json.query.results.quote.length;
  for (var i = 0; i < totalReturned; ++i) {
        obj["var" + (i + 1)] = Number(Number(json.query.results.quote[i].Close).toFixed(2));
        label["date" + (i + 1)] = moment(json.query.results.quote[i].Date).format('ll');
        label["price" + (i + 1)] = parseFloat(Math.round(json.query.results.quote[i].Close * 100) / 100).toFixed(2);
    }

  if (Number(json.query.results.quote[0].Close) < Number(json.query.results.quote[totalReturned - 1].Close)) {
    lineColor = "rgb(255, 0, 108)";
  } else {
    lineColor = "rgb(26, 187, 156)";
  }

  $(".timeline a").css("color", "#586468");
  $(".6M a").css("color", lineColor);

	updateChart6M();
}

function updateHistory1Y(json) {
  obj = {};
  label = {};

  totalReturned = json.query.results.quote.length;
  for (var i = 0; i < totalReturned; ++i) {
        obj["var" + (i + 1)] = Number(Number(json.query.results.quote[i].Close).toFixed(2));
        label["date" + (i + 1)] = moment(json.query.results.quote[i].Date).format('ll');
        label["price" + (i + 1)] = parseFloat(Math.round(json.query.results.quote[i].Close * 100) / 100).toFixed(2);
    }

  if (Number(json.query.results.quote[0].Close) < Number(json.query.results.quote[totalReturned - 1].Close)) {
    lineColor = "rgb(255, 0, 108)";
  } else {
    lineColor = "rgb(26, 187, 156)";
  }

  $(".timeline a").css("color", "#586468");
  $(".1Y a").css("color", lineColor);

	updateChart1Y();
}

//updating the chart with timeline selection data
function updateChart1D(json) {
	console.log("updateChart1D");

  var arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });
  var min = Math.min.apply( null, arr );
  var max = Math.max.apply( null, arr );
  var tooltipBGColor = $("body").css('background-color').replace(')', ', 0.7)').replace('rgb', 'rgba');

	$(function () {
	$("#chart").CanvasJSChart({ //Pass chart options
		backgroundColor: $("body").css('background-color'),
		data: [
		{
		type: "line", //change it to column, spline, line, pie, etc
		color: lineColor,
    markerBorderColor: lineColor,
    markerBorderThickness: 2,
    markerColor: $("body").css('background-color'),
		markerSize: 1,
		dataPoints: [ //26 updates intra-day, <23 days for 1M, <69 days for 3M, <138 days for 6M, <252 days for 1Y
      { x:1 , y: obj.var1, date: label.date1, price: label.price1 },
			{ x:2 , y: obj.var2, date: label.date2, price: label.price2 },
			{ x:3 , y: obj.var3, date: label.date3, price: label.price3 },
			{ x:4 , y: obj.var4, date: label.date4, price: label.price4 },
			{ x:5 , y: obj.var5, date: label.date5, price: label.price5 },
			{ x:6 , y: obj.var6, date: label.date6, price: label.price6 },
			{ x:7 , y: obj.var7, date: label.date7, price: label.price7 },
			{ x:8 , y: obj.var8, date: label.date8, price: label.price8 },
			{ x:9 , y: obj.var9, date: label.date9, price: label.price9 },
			{ x:10 , y: obj.var10, date: label.date10, price: label.price10 },
			{ x:11 , y: obj.var11, date: label.date11, price: label.price11 },
			{ x:12 , y: obj.var12, date: label.date12, price: label.price12 },
			{ x:13 , y: obj.var13, date: label.date13, price: label.price13 },
			{ x:14 , y: obj.var14, date: label.date14, price: label.price14 },
			{ x:15 , y: obj.var15, date: label.date15, price: label.price15 },
			{ x:16 , y: obj.var16, date: label.date16, price: label.price16 },
			{ x:17 , y: obj.var17, date: label.date17, price: label.price17 },
			{ x:18 , y: obj.var18, date: label.date18, price: label.price18 },
			{ x:19 , y: obj.var19, date: label.date19, price: label.price19 },
			{ x:20 , y: obj.var20, date: label.date20, price: label.price20 },
			{ x:21 , y: obj.var21, date: label.date21, price: label.price21 },
			{ x:22 , y: obj.var22, date: label.date22, price: label.price22 },
			{ x:23 , y: obj.var23, date: label.date23, price: label.price23 },
			{ x:24 , y: obj.var24, date: label.date24, price: label.price24 },
			{ x:25 , y: obj.var25, date: label.date25, price: label.price25 },
			{ x:26 , y: obj.var26, date: label.date26, price: label.price26 },
			{ x:27 , y: obj.var27, date: label.date27, price: label.price27 },
			{ x:28 , y: obj.var28, date: label.date28, price: label.price28 },
			{ x:29 , y: obj.var29, date: label.date29, price: label.price29 },
			{ x:30 , y: obj.var30, date: label.date30, price: label.price30 },
			{ x:31 , y: obj.var31, date: label.date31, price: label.price31 },
			{ x:32 , y: obj.var32, date: label.date32, price: label.price32 },
			{ x:33 , y: obj.var33, date: label.date33, price: label.price33 },
			{ x:34 , y: obj.var34, date: label.date34, price: label.price34 },
			{ x:35 , y: obj.var35, date: label.date35, price: label.price35 },
			{ x:36 , y: obj.var36, date: label.date36, price: label.price36 },
			{ x:37 , y: obj.var37, date: label.date37, price: label.price37 },
			{ x:38 , y: obj.var38, date: label.date38, price: label.price38 },
			{ x:39 , y: obj.var39, date: label.date39, price: label.price39 },
			{ x:40 , y: obj.var40, date: label.date40, price: label.price40 },
			{ x:41 , y: obj.var41, date: label.date41, price: label.price41 },
			{ x:42 , y: obj.var42, date: label.date42, price: label.price42 },
			{ x:43 , y: obj.var43, date: label.date43, price: label.price43 },
			{ x:44 , y: obj.var44, date: label.date44, price: label.price44 },
			{ x:45 , y: obj.var45, date: label.date45, price: label.price45 },
			{ x:46 , y: obj.var46, date: label.date46, price: label.price46 },
			{ x:47 , y: obj.var47, date: label.date47, price: label.price47 },
			{ x:48 , y: obj.var48, date: label.date48, price: label.price48 },
			{ x:49 , y: obj.var49, date: label.date49, price: label.price49 },
			{ x:50 , y: obj.var50, date: label.date50, price: label.price50 },
			{ x:51 , y: obj.var51, date: label.date51, price: label.price51 },
			{ x:52 , y: obj.var52, date: label.date52, price: label.price52 },
			{ x:53 , y: obj.var53, date: label.date53, price: label.price53 },
			{ x:54 , y: obj.var54, date: label.date54, price: label.price54 },
			{ x:55 , y: obj.var55, date: label.date55, price: label.price55 },
			{ x:56 , y: obj.var56, date: label.date56, price: label.price56 },
			{ x:57 , y: obj.var57, date: label.date57, price: label.price57 },
			{ x:58 , y: obj.var58, date: label.date58, price: label.price58 },
			{ x:59 , y: obj.var59, date: label.date59, price: label.price59 },
			{ x:60 , y: obj.var60, date: label.date60, price: label.price60 },
			{ x:61 , y: obj.var61, date: label.date61, price: label.price61 },
			{ x:62 , y: obj.var62, date: label.date62, price: label.price62 },
			{ x:63 , y: obj.var63, date: label.date63, price: label.price63 },
			{ x:64 , y: obj.var64, date: label.date64, price: label.price64 },
			{ x:65 , y: obj.var65, date: label.date65, price: label.price65 },
			{ x:66 , y: obj.var66, date: label.date66, price: label.price66 },
			{ x:67 , y: obj.var67, date: label.date67, price: label.price67 },
			{ x:68 , y: obj.var68, date: label.date68, price: label.price68 },
      { x:69 , y: obj.var69, date: label.date69, price: label.price69 },
			{ x:70 , y: obj.var70, date: label.date70, price: label.price70 },
			{ x:71 , y: obj.var71, date: label.date71, price: label.price71 },
			{ x:72 , y: obj.var72, date: label.date72, price: label.price72 },
			{ x:73 , y: obj.var73, date: label.date73, price: label.price73 },
			{ x:74 , y: obj.var74, date: label.date74, price: label.price74 },
			{ x:75 , y: obj.var75, date: label.date75, price: label.price75 },
			{ x:76 , y: obj.var76, date: label.date76, price: label.price76 },
			{ x:77 , y: obj.var77, date: label.date77, price: label.price77 },
			{ x:78 , y: obj.var78, date: label.date78, price: label.price78 },
			{ x:79 , y: obj.var79, date: label.date79, price: label.price79 },
			{ x:80 , y: obj.var80, date: label.date80, price: label.price80 },
			{ x:81 , y: obj.var81, date: label.date81, price: label.price81 },
			{ x:82 , y: obj.var82, date: label.date82, price: label.price82 },
			{ x:83 , y: obj.var83, date: label.date83, price: label.price83 },
			{ x:84 , y: obj.var84, date: label.date84, price: label.price84 },
			{ x:85 , y: obj.var85, date: label.date85, price: label.price85 },
			{ x:86 , y: obj.var86, date: label.date86, price: label.price86 },
			{ x:87 , y: obj.var87, date: label.date87, price: label.price87 },
			{ x:88 , y: obj.var88, date: label.date88, price: label.price88 },
			{ x:89 , y: obj.var89, date: label.date89, price: label.price89 },
			{ x:90 , y: obj.var90, date: label.date90, price: label.price90 },
			{ x:91 , y: obj.var91, date: label.date91, price: label.price91 },
			{ x:92 , y: obj.var92, date: label.date92, price: label.price92 },
			{ x:93 , y: obj.var93, date: label.date93, price: label.price93 },
			{ x:94 , y: obj.var94, date: label.date94, price: label.price94 },
			{ x:95 , y: obj.var95, date: label.date95, price: label.price95 },
			{ x:96 , y: obj.var96, date: label.date96, price: label.price96 },
			{ x:97 , y: obj.var97, date: label.date97, price: label.price97 },
			{ x:98 , y: obj.var98, date: label.date98, price: label.price98 },
			{ x:99 , y: obj.var99, date: label.date99, price: label.price99 },
			{ x:100 , y: obj.var100, date: label.date100, price: label.price100 },
			{ x:101 , y: obj.var101, date: label.date101, price: label.price101 },
			{ x:102 , y: obj.var102, date: label.date102, price: label.price102 },
			{ x:103 , y: obj.var103, date: label.date103, price: label.price103 },
			{ x:104 , y: obj.var104, date: label.date104, price: label.price104 },
			{ x:105 , y: obj.var105, date: label.date105, price: label.price105 },
			{ x:106 , y: obj.var106, date: label.date106, price: label.price106 },
			{ x:107 , y: obj.var107, date: label.date107, price: label.price107 },
			{ x:108 , y: obj.var108, date: label.date108, price: label.price108 },
			{ x:109 , y: obj.var109, date: label.date109, price: label.price109 },
			{ x:110 , y: obj.var110, date: label.date110, price: label.price110 },
			{ x:111 , y: obj.var111, date: label.date111, price: label.price111 },
			{ x:112 , y: obj.var112, date: label.date112, price: label.price112 },
			{ x:113 , y: obj.var113, date: label.date113, price: label.price113 },
			{ x:114 , y: obj.var114, date: label.date114, price: label.price114 },
			{ x:115 , y: obj.var115, date: label.date115, price: label.price115 },
			{ x:116 , y: obj.var116, date: label.date116, price: label.price116 },
			{ x:117 , y: obj.var117, date: label.date117, price: label.price117 },
			{ x:118 , y: obj.var118, date: label.date118, price: label.price118 },
			{ x:119 , y: obj.var119, date: label.date119, price: label.price119 },
			{ x:120 , y: obj.var120, date: label.date120, price: label.price120 },
			{ x:121 , y: obj.var121, date: label.date121, price: label.price121 },
			{ x:122 , y: obj.var122, date: label.date122, price: label.price122 },
			{ x:123 , y: obj.var123, date: label.date123, price: label.price123 },
			{ x:124 , y: obj.var124, date: label.date124, price: label.price124 },
			{ x:125 , y: obj.var125, date: label.date125, price: label.price125 },
			{ x:126 , y: obj.var126, date: label.date126, price: label.price126 },
			{ x:127 , y: obj.var127, date: label.date127, price: label.price127 },
			{ x:128 , y: obj.var128, date: label.date128, price: label.price128 },
			{ x:129 , y: obj.var129, date: label.date129, price: label.price129 },
			{ x:130 , y: obj.var130, date: label.date130, price: label.price130 },
			{ x:131 , y: obj.var131, date: label.date131, price: label.price131 },
			{ x:132 , y: obj.var132, date: label.date132, price: label.price132 },
			{ x:133 , y: obj.var133, date: label.date133, price: label.price133 },
			{ x:134 , y: obj.var134, date: label.date134, price: label.price134 },
			{ x:135 , y: obj.var135, date: label.date135, price: label.price135 },
			{ x:136 , y: obj.var136, date: label.date136, price: label.price136 },
      { x:137 , y: obj.var137, date: label.date137, price: label.price137 },
			{ x:138 , y: obj.var138, date: label.date138, price: label.price138 },
      { x:139 , y: obj.var139, date: label.date139, price: label.price139 },
			{ x:140 , y: obj.var140, date: label.date140, price: label.price140 },
			{ x:141 , y: obj.var141, date: label.date141, price: label.price141 },
			{ x:142 , y: obj.var142, date: label.date142, price: label.price142 },
			{ x:143 , y: obj.var143, date: label.date143, price: label.price143 },
			{ x:144 , y: obj.var144, date: label.date144, price: label.price144 },
			{ x:145 , y: obj.var145, date: label.date145, price: label.price145 },
			{ x:146 , y: obj.var146, date: label.date146, price: label.price146 },
			{ x:147 , y: obj.var147, date: label.date147, price: label.price147 },
			{ x:148 , y: obj.var148, date: label.date148, price: label.price148 },
			{ x:149 , y: obj.var149, date: label.date149, price: label.price149 },
			{ x:150 , y: obj.var150, date: label.date150, price: label.price150 },
			{ x:151 , y: obj.var151, date: label.date151, price: label.price151 },
			{ x:152 , y: obj.var152, date: label.date152, price: label.price152 },
			{ x:153 , y: obj.var153, date: label.date153, price: label.price153 },
			{ x:154 , y: obj.var154, date: label.date154, price: label.price154 },
			{ x:155 , y: obj.var155, date: label.date155, price: label.price155 },
			{ x:156 , y: obj.var156, date: label.date156, price: label.price156 },
			{ x:157 , y: obj.var157, date: label.date157, price: label.price157 },
			{ x:158 , y: obj.var158, date: label.date158, price: label.price158 },
			{ x:159 , y: obj.var159, date: label.date159, price: label.price159 },
			{ x:160 , y: obj.var160, date: label.date160, price: label.price160 },
			{ x:161 , y: obj.var161, date: label.date161, price: label.price161 },
			{ x:162 , y: obj.var162, date: label.date162, price: label.price162 },
			{ x:163 , y: obj.var163, date: label.date163, price: label.price163 },
			{ x:164 , y: obj.var164, date: label.date164, price: label.price164 },
			{ x:165 , y: obj.var165, date: label.date165, price: label.price165 },
			{ x:166 , y: obj.var166, date: label.date166, price: label.price166 },
			{ x:167 , y: obj.var167, date: label.date167, price: label.price167 },
			{ x:168 , y: obj.var168, date: label.date168, price: label.price168 },
			{ x:169 , y: obj.var169, date: label.date169, price: label.price169 },
			{ x:170 , y: obj.var170, date: label.date170, price: label.price170 },
			{ x:171 , y: obj.var171, date: label.date171, price: label.price171 },
			{ x:172 , y: obj.var172, date: label.date172, price: label.price172 },
			{ x:173 , y: obj.var173, date: label.date173, price: label.price173 },
			{ x:174 , y: obj.var174, date: label.date174, price: label.price174 },
			{ x:175 , y: obj.var175, date: label.date175, price: label.price175 },
			{ x:176 , y: obj.var176, date: label.date176, price: label.price176 },
			{ x:177 , y: obj.var177, date: label.date177, price: label.price177 },
			{ x:178 , y: obj.var178, date: label.date178, price: label.price178 },
			{ x:179 , y: obj.var179, date: label.date179, price: label.price179 },
			{ x:180 , y: obj.var180, date: label.date180, price: label.price180 },
			{ x:181 , y: obj.var181, date: label.date181, price: label.price181 },
			{ x:182 , y: obj.var182, date: label.date182, price: label.price182 },
			{ x:183 , y: obj.var183, date: label.date183, price: label.price183 },
			{ x:184 , y: obj.var184, date: label.date184, price: label.price184 },
			{ x:185 , y: obj.var185, date: label.date185, price: label.price185 },
			{ x:186 , y: obj.var186, date: label.date186, price: label.price186 },
			{ x:187 , y: obj.var187, date: label.date187, price: label.price187 },
			{ x:188 , y: obj.var188, date: label.date188, price: label.price188 },
			{ x:189 , y: obj.var189, date: label.date189, price: label.price189 },
			{ x:190 , y: obj.var190, date: label.date190, price: label.price190 },
			{ x:191 , y: obj.var191, date: label.date191, price: label.price191 },
			{ x:192 , y: obj.var192, date: label.date192, price: label.price192 },
			{ x:193 , y: obj.var193, date: label.date193, price: label.price193 },
			{ x:194 , y: obj.var194, date: label.date194, price: label.price194 },
			{ x:195 , y: obj.var195, date: label.date195, price: label.price195 },
			{ x:196 , y: obj.var196, date: label.date196, price: label.price196 },
			{ x:197 , y: obj.var197, date: label.date197, price: label.price197 },
			{ x:198 , y: obj.var198, date: label.date198, price: label.price198 },
			{ x:199 , y: obj.var199, date: label.date199, price: label.price199 },
			{ x:200 , y: obj.var200, date: label.date200, price: label.price200 },
			{ x:201 , y: obj.var201, date: label.date201, price: label.price201 },
			{ x:202 , y: obj.var202, date: label.date202, price: label.price202 },
			{ x:203 , y: obj.var203, date: label.date203, price: label.price203 },
			{ x:204 , y: obj.var204, date: label.date204, price: label.price204 },
			{ x:205 , y: obj.var205, date: label.date205, price: label.price205 },
			{ x:206 , y: obj.var206, date: label.date206, price: label.price206 },
      { x:207 , y: obj.var207, date: label.date207, price: label.price207 },
			{ x:208 , y: obj.var208, date: label.date208, price: label.price208 },
			{ x:209 , y: obj.var209, date: label.date209, price: label.price209 },
			{ x:210 , y: obj.var210, date: label.date210, price: label.price210 },
			{ x:211 , y: obj.var211, date: label.date211, price: label.price211 },
			{ x:212 , y: obj.var212, date: label.date212, price: label.price212 },
			{ x:213 , y: obj.var213, date: label.date213, price: label.price213 },
			{ x:214 , y: obj.var214, date: label.date214, price: label.price214 },
			{ x:215 , y: obj.var215, date: label.date215, price: label.price215 },
			{ x:216 , y: obj.var216, date: label.date216, price: label.price216 },
			{ x:217 , y: obj.var217, date: label.date217, price: label.price217 },
			{ x:218 , y: obj.var218, date: label.date218, price: label.price218 },
			{ x:219 , y: obj.var219, date: label.date219, price: label.price219 },
			{ x:220 , y: obj.var220, date: label.date220, price: label.price220 },
			{ x:221 , y: obj.var221, date: label.date221, price: label.price221 },
			{ x:222 , y: obj.var222, date: label.date222, price: label.price222 },
			{ x:223 , y: obj.var223, date: label.date223, price: label.price223 },
			{ x:224 , y: obj.var224, date: label.date224, price: label.price224 },
			{ x:225 , y: obj.var225, date: label.date225, price: label.price225 },
			{ x:226 , y: obj.var226, date: label.date226, price: label.price226 },
			{ x:227 , y: obj.var227, date: label.date227, price: label.price227 },
			{ x:228 , y: obj.var228, date: label.date228, price: label.price228 },
			{ x:229 , y: obj.var229, date: label.date229, price: label.price229 },
			{ x:230 , y: obj.var230, date: label.date230, price: label.price230 },
			{ x:231 , y: obj.var231, date: label.date231, price: label.price231 },
			{ x:232 , y: obj.var232, date: label.date232, price: label.price232 },
			{ x:233 , y: obj.var233, date: label.date233, price: label.price233 },
			{ x:234 , y: obj.var234, date: label.date234, price: label.price234 },
			{ x:235 , y: obj.var235, date: label.date235, price: label.price235 },
			{ x:236 , y: obj.var236, date: label.date236, price: label.price236 },
			{ x:237 , y: obj.var237, date: label.date237, price: label.price237 },
			{ x:238 , y: obj.var238, date: label.date238, price: label.price238 },
			{ x:239 , y: obj.var239, date: label.date239, price: label.price239 },
			{ x:240 , y: obj.var240, date: label.date240, price: label.price240 },
			{ x:241 , y: obj.var241, date: label.date241, price: label.price241 },
			{ x:242 , y: obj.var242, date: label.date242, price: label.price242 },
			{ x:243 , y: obj.var243, date: label.date243, price: label.price243 },
			{ x:244 , y: obj.var244, date: label.date244, price: label.price244 },
			{ x:245 , y: obj.var245, date: label.date245, price: label.price245 },
			{ x:246 , y: obj.var246, date: label.date246, price: label.price246 },
			{ x:247 , y: obj.var247, date: label.date247, price: label.price247 },
			{ x:248 , y: obj.var248, date: label.date248, price: label.price248 },
			{ x:249 , y: obj.var249, date: label.date249, price: label.price249 },
			{ x:250 , y: obj.var250, date: label.date250, price: label.price250 },
			{ x:251 , y: obj.var251, date: label.date251, price: label.price251 },
			{ x:252 , y: obj.var252, date: label.date252, price: label.price252 },
      { x:253 , y: obj.var253, date: label.date253, price: label.price253 },
			{ x:254 , y: obj.var254, date: label.date254, price: label.price254 },
			{ x:255 , y: obj.var255, date: label.date255, price: label.price255 },
			{ x:256 , y: obj.var256, date: label.date256, price: label.price256 },
			{ x:257 , y: obj.var257, date: label.date257, price: label.price257 },
			{ x:258 , y: obj.var258, date: label.date258, price: label.price258 },
			{ x:259 , y: obj.var259, date: label.date259, price: label.price259 },
			{ x:260 , y: obj.var260, date: label.date260, price: label.price260 },
			{ x:261 , y: obj.var261, date: label.date261, price: label.price261 },
			{ x:262 , y: obj.var262, date: label.date262, price: label.price262 },
			{ x:263 , y: obj.var263, date: label.date263, price: label.price263 },
			{ x:264 , y: obj.var264, date: label.date264, price: label.price264 },
			{ x:265 , y: obj.var265, date: label.date265, price: label.price265 },
			{ x:266 , y: obj.var266, date: label.date266, price: label.price266 },
			{ x:267 , y: obj.var267, date: label.date267, price: label.price267 },
			{ x:268 , y: obj.var268, date: label.date268, price: label.price268 },
			{ x:269 , y: obj.var269, date: label.date269, price: label.price269 },
			{ x:270 , y: obj.var270, date: label.date270, price: label.price270 },
			{ x:271 , y: obj.var271, date: label.date271, price: label.price271 },
			{ x:272 , y: obj.var272, date: label.date272, price: label.price272 },
			{ x:273 , y: obj.var273, date: label.date273, price: label.price273 },
			{ x:274 , y: obj.var274, date: label.date274, price: label.price274 },
			{ x:275 , y: obj.var275, date: label.date275, price: label.price275 },
			{ x:276 , y: obj.var276, date: label.date276, price: label.price276 },
			{ x:277 , y: obj.var277, date: label.date277, price: label.price277 },
			{ x:278 , y: obj.var278, date: label.date278, price: label.price278 },
			{ x:279 , y: obj.var279, date: label.date279, price: label.price279 },
			{ x:280 , y: obj.var280, date: label.date280, price: label.price280 },
			{ x:281 , y: obj.var281, date: label.date281, price: label.price281 },
			{ x:282 , y: obj.var282, date: label.date282, price: label.price282 },
			{ x:283 , y: obj.var283, date: label.date283, price: label.price283 },
			{ x:284 , y: obj.var284, date: label.date284, price: label.price284 },
			{ x:285 , y: obj.var285, date: label.date285, price: label.price285 },
			{ x:286 , y: obj.var286, date: label.date286, price: label.price286 },
			{ x:287 , y: obj.var287, date: label.date287, price: label.price287 },
			{ x:288 , y: obj.var288, date: label.date288, price: label.price288 },
			{ x:289 , y: obj.var289, date: label.date289, price: label.price289 },
			{ x:290 , y: obj.var290, date: label.date290, price: label.price290 },
			{ x:291 , y: obj.var291, date: label.date291, price: label.price291 },
			{ x:292 , y: obj.var292, date: label.date292, price: label.price292 },
			{ x:293 , y: obj.var293, date: label.date293, price: label.price293 },
			{ x:294 , y: obj.var294, date: label.date294, price: label.price294 },
			{ x:295 , y: obj.var295, date: label.date295, price: label.price295 },
			{ x:296 , y: obj.var296, date: label.date296, price: label.price296 },
			{ x:297 , y: obj.var297, date: label.date297, price: label.price297 },
			{ x:298 , y: obj.var298, date: label.date298, price: label.price298 },
			{ x:299 , y: obj.var299, date: label.date299, price: label.price299 },
			{ x:300 , y: obj.var300, date: label.date300, price: label.price300 },
			{ x:301 , y: obj.var301, date: label.date301, price: label.price301 },
			{ x:302 , y: obj.var302, date: label.date302, price: label.price302 },
			{ x:303 , y: obj.var303, date: label.date303, price: label.price303 },
			{ x:304 , y: obj.var304, date: label.date304, price: label.price304 },
			{ x:305 , y: obj.var305, date: label.date305, price: label.price305 },
			{ x:306 , y: obj.var306, date: label.date306, price: label.price306 },
			{ x:307 , y: obj.var307, date: label.date307, price: label.price307 },
			{ x:308 , y: obj.var308, date: label.date308, price: label.price308 },
			{ x:309 , y: obj.var309, date: label.date309, price: label.price309 },
			{ x:310 , y: obj.var310, date: label.date310, price: label.price310 },
			{ x:311 , y: obj.var311, date: label.date311, price: label.price311 },
			{ x:312 , y: obj.var312, date: label.date312, price: label.price312 },
			{ x:313 , y: obj.var313, date: label.date313, price: label.price313 },
			{ x:314 , y: obj.var314, date: label.date314, price: label.price314 },
			{ x:315 , y: obj.var315, date: label.date315, price: label.price315 },
			{ x:316 , y: obj.var316, date: label.date316, price: label.price316 },
			{ x:317 , y: obj.var317, date: label.date317, price: label.price317 },
			{ x:318 , y: obj.var318, date: label.date318, price: label.price318 },
			{ x:319 , y: obj.var319, date: label.date319, price: label.price319 },
			{ x:320 , y: obj.var320, date: label.date320, price: label.price320 },
      { x:321 , y: obj.var321, date: label.date321, price: label.price321 },
			{ x:322 , y: obj.var322, date: label.date322, price: label.price322 },
			{ x:323 , y: obj.var323, date: label.date323, price: label.price323 },
			{ x:324 , y: obj.var324, date: label.date324, price: label.price324 },
			{ x:325 , y: obj.var325, date: label.date325, price: label.price325 },
			{ x:326 , y: obj.var326, date: label.date326, price: label.price326 },
			{ x:327 , y: obj.var327, date: label.date327, price: label.price327 },
			{ x:328 , y: obj.var328, date: label.date328, price: label.price328 },
			{ x:329 , y: obj.var329, date: label.date329, price: label.price329 },
			{ x:330 , y: obj.var330, date: label.date330, price: label.price330 },
			{ x:331 , y: obj.var331, date: label.date331, price: label.price331 },
			{ x:332 , y: obj.var332, date: label.date332, price: label.price332 },
			{ x:333 , y: obj.var333, date: label.date333, price: label.price333 },
			{ x:334 , y: obj.var334, date: label.date334, price: label.price334 },
			{ x:335 , y: obj.var335, date: label.date335, price: label.price335 },
			{ x:336 , y: obj.var336, date: label.date336, price: label.price336 },
			{ x:337 , y: obj.var337, date: label.date337, price: label.price337 },
			{ x:338 , y: obj.var338, date: label.date338, price: label.price338 },
			{ x:339 , y: obj.var339, date: label.date339, price: label.price339 },
			{ x:340 , y: obj.var340, date: label.date340, price: label.price340 },
			{ x:341 , y: obj.var341, date: label.date341, price: label.price341 },
			{ x:342 , y: obj.var342, date: label.date342, price: label.price342 },
			{ x:343 , y: obj.var343, date: label.date343, price: label.price343 },
			{ x:344 , y: obj.var344, date: label.date344, price: label.price344 },
			{ x:345 , y: obj.var345, date: label.date345, price: label.price345 },
			{ x:346 , y: obj.var346, date: label.date346, price: label.price346 },
			{ x:347 , y: obj.var347, date: label.date347, price: label.price347 },
			{ x:348 , y: obj.var348, date: label.date348, price: label.price348 },
			{ x:349 , y: obj.var349, date: label.date349, price: label.price349 },
			{ x:350 , y: obj.var350, date: label.date350, price: label.price350 },
			{ x:351 , y: obj.var351, date: label.date351, price: label.price351 },
			{ x:352 , y: obj.var352, date: label.date352, price: label.price352 },
			{ x:353 , y: obj.var353, date: label.date353, price: label.price353 },
			{ x:354 , y: obj.var354, date: label.date354, price: label.price354 },
			{ x:355 , y: obj.var355, date: label.date355, price: label.price355 },
			{ x:356 , y: obj.var356, date: label.date356, price: label.price356 },
			{ x:357 , y: obj.var357, date: label.date357, price: label.price357 },
			{ x:358 , y: obj.var358, date: label.date358, price: label.price358 },
			{ x:359 , y: obj.var359, date: label.date359, price: label.price359 },
			{ x:360 , y: obj.var360, date: label.date360, price: label.price360 },
			{ x:361 , y: obj.var361, date: label.date361, price: label.price361 },
			{ x:362 , y: obj.var362, date: label.date362, price: label.price362 },
			{ x:363 , y: obj.var363, date: label.date363, price: label.price363 },
			{ x:364 , y: obj.var364, date: label.date364, price: label.price364 },
			{ x:365 , y: obj.var365, date: label.date365, price: label.price365 },
			{ x:366 , y: obj.var366, date: label.date366, price: label.price366 },
			{ x:367 , y: obj.var367, date: label.date367, price: label.price367 },
			{ x:368 , y: obj.var368, date: label.date368, price: label.price368 },
			{ x:369 , y: obj.var369, date: label.date369, price: label.price369 },
			{ x:370 , y: obj.var370, date: label.date370, price: label.price370 },
			{ x:371 , y: obj.var371, date: label.date371, price: label.price371 },
			{ x:372 , y: obj.var372, date: label.date372, price: label.price372 },
			{ x:373 , y: obj.var373, date: label.date373, price: label.price373 },
			{ x:374 , y: obj.var374, date: label.date374, price: label.price374 },
			{ x:375 , y: obj.var375, date: label.date375, price: label.price375 },
			{ x:376 , y: obj.var376, date: label.date376, price: label.price376 },
			{ x:377 , y: obj.var377, date: label.date377, price: label.price377 },
			{ x:378 , y: obj.var378, date: label.date378, price: label.price378 },
			{ x:379 , y: obj.var379, date: label.date379, price: label.price379 },
			{ x:380 , y: obj.var380, date: label.date380, price: label.price380 },
			{ x:381 , y: obj.var381, date: label.date381, price: label.price381 },
			{ x:382 , y: obj.var382, date: label.date382, price: label.price382 },
			{ x:383 , y: obj.var383, date: label.date383, price: label.price383 },
			{ x:384 , y: obj.var384, date: label.date384, price: label.price384 },
			{ x:385 , y: obj.var385, date: label.date385, price: label.price385 },
			{ x:386 , y: obj.var386, date: label.date386, price: label.price386 },
			{ x:387 , y: obj.var387, date: label.date387, price: label.price387 },
			{ x:388 , y: obj.var388, date: label.date388, price: label.price388 },
      { x:389 , y: obj.var389, date: label.date389, price: label.price389 },
			{ x:390 , y: obj.var390, date: label.date390, price: label.price390 },
		]
	},
	],
      axisX: {
        title: "",
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        labelFontSize: "0"
      },
      axisY: {
        minimum: min * 0.999,
        maximum: max * 1.001,
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        stripLines:[{
  				value: obj.var1,
          lineDashType: "dash",
          color: "#979797",
          showOnTop: false,
          thickness: 2
  			}]
      },
      toolTip:{
        content: "<span style='\"'color: #979797;'\"'>{date}</span><br/>${price}",
        backgroundColor: tooltipBGColor,
        borderThickness: 0,
        fontFamily: "Ropa Sans",
        fontSize: 20,
        fontStyle: "normal",
        fontColor: lineColor,
        animationEnabled: true
      },
	});

	});
  var difference = document.querySelector(".difference");
  difference.textContent = "TODAY: " + Number(stock.quote.price - obj.var1).toFixed(2) + " (" + (((Number(stock.quote.price).toFixed(2) - obj.var1)/obj.var1)*100).toFixed(2) + "%)";
  $(".difference").css("color", lineColor);
}

function updateChart1M() {
	console.log("updateChart1M");

  var arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });
  var min = Math.min.apply( null, arr );
  var max = Math.max.apply( null, arr );
  var tooltipBGColor = $("body").css('background-color').replace(')', ', 0.7)').replace('rgb', 'rgba');

  for (var i = 22; i > totalReturned; i--) {
    obj["var" + i] = null;
    label["date" + i] = null;
    label["price" + i] = null;
  }

	$(function () {
	$("#chart").CanvasJSChart({ //Pass chart options
		backgroundColor: $("body").css('background-color'),
		data: [
		{
		type: "line", //change it to column, spline, line, pie, etc
		color: lineColor,
    markerBorderColor: lineColor,
    markerBorderThickness: 2,
    markerColor: $("body").css('background-color'),
		markerSize: 1,
		dataPoints: [ //26 updates intra-day, <23 days for 1M, <69 days for 3M, <138 days for 6M, <276 days for 1Y
			{ x: 1, y: obj.var22, date: label.date22, price: label.price22 },
			{ x: 2, y: obj.var21, date: label.date21, price: label.price21 },
			{ x: 3, y: obj.var20, date: label.date20, price: label.price20 },
			{ x: 4, y: obj.var19, date: label.date19, price: label.price19 },
			{ x: 5, y: obj.var18, date: label.date18, price: label.price18 },
			{ x: 6, y: obj.var17, date: label.date17, price: label.price17 },
			{ x: 7, y: obj.var16, date: label.date16, price: label.price16 },
			{ x: 8, y: obj.var15, date: label.date15, price: label.price15 },
			{ x: 9, y: obj.var14, date: label.date14, price: label.price14 },
			{ x: 10, y: obj.var13, date: label.date13, price: label.price13 },
			{ x: 11, y: obj.var12, date: label.date12, price: label.price12 },
			{ x: 12, y: obj.var11, date: label.date11, price: label.price11 },
			{ x: 13, y: obj.var10, date: label.date10, price: label.price10 },
			{ x: 14, y: obj.var9, date: label.date9, price: label.price9 },
			{ x: 15, y: obj.var8, date: label.date8, price: label.price8 },
			{ x: 16, y: obj.var7, date: label.date7, price: label.price7 },
			{ x: 17, y: obj.var6, date: label.date6, price: label.price6 },
			{ x: 18, y: obj.var5, date: label.date5, price: label.price5 },
			{ x: 19, y: obj.var4, date: label.date4, price: label.price4 },
			{ x: 20, y: obj.var3, date: label.date3, price: label.price3 },
			{ x: 21, y: obj.var2, date: label.date2, price: label.price2 },
			{ x: 22, y: obj.var1, date: label.date1, price: label.price1 },
		]
	},
	],
      axisX: {
        title: "",
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        labelFontSize: "0"
      },
      axisY: {
      	minimum: min * 0.999,
        maximum: max * 1.001,
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        stripLines:[{
  				value: obj[Object.keys(obj)[totalReturned-1]],
          lineDashType: "dash",
          color: "#979797",
          showOnTop: false,
          thickness: 2
  			}]
      },
      toolTip:{
        content: "<span style='\"'color: #979797;'\"'>{date}</span><br/>${price}",
        backgroundColor: tooltipBGColor,
        borderThickness: 0,
        fontFamily: "Ropa Sans",
        fontSize: 20,
        fontStyle: "normal",
        fontColor: lineColor,
        animationEnabled: true
      },
	});

	});
  var difference = document.querySelector(".difference");
  difference.textContent = "PAST 1M: " + Number(stock.quote.price - obj[Object.keys(obj)[totalReturned-1]]).toFixed(2) + " (" + (((Number(stock.quote.price).toFixed(2) - obj[Object.keys(obj)[totalReturned-1]])/obj[Object.keys(obj)[totalReturned-1]])*100).toFixed(2) + "%)";
  $(".difference").css("color", lineColor);

}

function updateChart3M() {
	console.log("updateChart3M");

  var arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });
  var min = Math.min.apply( null, arr );
  var max = Math.max.apply( null, arr );
  var tooltipBGColor = $("body").css('background-color').replace(')', ', 0.7)').replace('rgb', 'rgba');


for (var i = 68; i > totalReturned; i--) {
  obj["var" + i] = null;
  label["date" + i] = null;
  label["price" + i] = null;
}

	$(function () {
	$("#chart").CanvasJSChart({ //Pass chart options
    backgroundColor: $("body").css('background-color'),
		data: [
		{
		type: "line", //change it to column, spline, line, pie, etc
		color: lineColor,
    markerBorderColor: lineColor,
    markerBorderThickness: 2,
    markerColor: $("body").css('background-color'),
		markerSize: 1,
		dataPoints: [ //26 updates intra-day, <23 days for 1M, <69 days for 3M, <138 days for 6M, <276 days for 1Y
			{ x: 1, y: obj.var68, date: label.date68, price: label.price68 },
			{ x: 2, y: obj.var67, date: label.date67, price: label.price67 },
			{ x: 3, y: obj.var66, date: label.date66, price: label.price66 },
			{ x: 4, y: obj.var65, date: label.date65, price: label.price65 },
			{ x: 5, y: obj.var64, date: label.date64, price: label.price64 },
			{ x: 6, y: obj.var63, date: label.date63, price: label.price63 },
			{ x: 7, y: obj.var62, date: label.date62, price: label.price62 },
			{ x: 8, y: obj.var61, date: label.date61, price: label.price61 },
			{ x: 9, y: obj.var60, date: label.date60, price: label.price60 },
			{ x: 10, y: obj.var59, date: label.date59, price: label.price59 },
			{ x: 11, y: obj.var58, date: label.date58, price: label.price58 },
			{ x: 12, y: obj.var57, date: label.date57, price: label.price57 },
			{ x: 13, y: obj.var56, date: label.date56, price: label.price56 },
			{ x: 14, y: obj.var55, date: label.date55, price: label.price55 },
			{ x: 15, y: obj.var54, date: label.date54, price: label.price54 },
			{ x: 16, y: obj.var53, date: label.date53, price: label.price53 },
			{ x: 17, y: obj.var52, date: label.date52, price: label.price52 },
			{ x: 18, y: obj.var51, date: label.date51, price: label.price51 },
			{ x: 19, y: obj.var50, date: label.date50, price: label.price50 },
			{ x: 20, y: obj.var49, date: label.date49, price: label.price49 },
			{ x: 21, y: obj.var48, date: label.date48, price: label.price48 },
			{ x: 22, y: obj.var47, date: label.date47, price: label.price47 },
			{ x: 23, y: obj.var46, date: label.date46, price: label.price46 },
			{ x: 24, y: obj.var45, date: label.date45, price: label.price45 },
			{ x: 25, y: obj.var44, date: label.date44, price: label.price44 },
			{ x: 26, y: obj.var43, date: label.date43, price: label.price43 },
			{ x: 27, y: obj.var42, date: label.date42, price: label.price42 },
			{ x: 28, y: obj.var41, date: label.date41, price: label.price41 },
			{ x: 29, y: obj.var40, date: label.date40, price: label.price40 },
			{ x: 30, y: obj.var39, date: label.date39, price: label.price39 },
			{ x: 31, y: obj.var38, date: label.date38, price: label.price38 },
			{ x: 32, y: obj.var37, date: label.date37, price: label.price37 },
			{ x: 33, y: obj.var36, date: label.date36, price: label.price36 },
			{ x: 34, y: obj.var35, date: label.date35, price: label.price35 },
			{ x: 35, y: obj.var34, date: label.date34, price: label.price34 },
			{ x: 36, y: obj.var33, date: label.date33, price: label.price33 },
			{ x: 37, y: obj.var32, date: label.date32, price: label.price32 },
			{ x: 38, y: obj.var31, date: label.date31, price: label.price31 },
			{ x: 39, y: obj.var30, date: label.date30, price: label.price30 },
			{ x: 40, y: obj.var29, date: label.date29, price: label.price29 },
			{ x: 41, y: obj.var28, date: label.date28, price: label.price28 },
			{ x: 42, y: obj.var27, date: label.date27, price: label.price27 },
			{ x: 43, y: obj.var26, date: label.date26, price: label.price26 },
			{ x: 44, y: obj.var25, date: label.date25, price: label.price25 },
			{ x: 45, y: obj.var24, date: label.date24, price: label.price24 },
			{ x: 46, y: obj.var23, date: label.date23, price: label.price23 },
			{ x: 47, y: obj.var22, date: label.date22, price: label.price22 },
			{ x: 48, y: obj.var21, date: label.date21, price: label.price21 },
			{ x: 49, y: obj.var20, date: label.date20, price: label.price20 },
			{ x: 50, y: obj.var19, date: label.date19, price: label.price19 },
			{ x: 51, y: obj.var18, date: label.date18, price: label.price18 },
			{ x: 52, y: obj.var17, date: label.date17, price: label.price17 },
			{ x: 53, y: obj.var16, date: label.date16, price: label.price16 },
			{ x: 54, y: obj.var15, date: label.date15, price: label.price15 },
			{ x: 55, y: obj.var14, date: label.date14, price: label.price14 },
			{ x: 56, y: obj.var13, date: label.date13, price: label.price13 },
			{ x: 57, y: obj.var12, date: label.date12, price: label.price12 },
			{ x: 58, y: obj.var11, date: label.date11, price: label.price11 },
			{ x: 59, y: obj.var10, date: label.date10, price: label.price10 },
			{ x: 60, y: obj.var9, date: label.date9, price: label.price9  },
			{ x: 61, y: obj.var8, date: label.date8, price: label.price8  },
			{ x: 62, y: obj.var7, date: label.date7, price: label.price7  },
			{ x: 63, y: obj.var6, date: label.date6, price: label.price6  },
			{ x: 64, y: obj.var5, date: label.date5, price: label.price5  },
			{ x: 65, y: obj.var4, date: label.date4, price: label.price4  },
			{ x: 66, y: obj.var3, date: label.date3, price: label.price3  },
			{ x: 67, y: obj.var2, date: label.date2, price: label.price2  },
			{ x: 68, y: obj.var1, date: label.date1, price: label.price1  },
		]
	},
	],
      axisX: {
        title: "",
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        labelFontSize: "0"
      },
      axisY: {
      	minimum: min * 0.999,
      	maximum: max * 1.001,
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        stripLines:[{
  				value: obj[Object.keys(obj)[totalReturned-1]],
          // value: obj[Object.keys(obj)[Object.keys(obj).length-1]],
          lineDashType: "dash",
          color: "#979797",
          showOnTop: false,
          thickness: 2
  			}]
      },
      toolTip:{
        content: "<span style='\"'color: #979797;'\"'>{date}</span><br/>${price}",
        backgroundColor: tooltipBGColor,
        borderThickness: 0,
        fontFamily: "Ropa Sans",
        fontSize: 20,
        fontStyle: "normal",
        fontColor: lineColor,
        animationEnabled: true
      },
	});

	});
  var difference = document.querySelector(".difference");
  difference.textContent = "PAST 3M: " + Number(stock.quote.price - obj[Object.keys(obj)[totalReturned-1]]).toFixed(2) + " (" + (((Number(stock.quote.price).toFixed(2) - obj[Object.keys(obj)[totalReturned-1]])/obj[Object.keys(obj)[totalReturned-1]])*100).toFixed(2) + "%)";
  $(".difference").css("color", lineColor);

}

function updateChart6M() {
	console.log("updateChart6M");

  var arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });
  var min = Math.min.apply( null, arr );
  var max = Math.max.apply( null, arr );
  var tooltipBGColor = $("body").css('background-color').replace(')', ', 0.7)').replace('rgb', 'rgba');

  for (var i = 132; i > totalReturned; i--) {
    obj["var" + i] = null;
    label["date" + i] = null;
    label["price" + i] = null;
  }

	$(function () {
	$("#chart").CanvasJSChart({ //Pass chart options
    backgroundColor: $("body").css('background-color'),
		data: [
		{
		type: "line", //change it to column, spline, line, pie, etc
		color: lineColor,
    markerBorderColor: lineColor,
    markerBorderThickness: 2,
    markerColor: $("body").css('background-color'),
		markerSize: 1,
		dataPoints: [ //26 updates intra-day, <23 days for 1M, <69 days for 3M, <132 days for 6M, <276 days for 1Y
			{ x: 01, y: obj.var132, date: label.date132, price: label.price132 },
			{ x: 02, y: obj.var131, date: label.date131, price: label.price131 },
			{ x: 03, y: obj.var130, date: label.date130, price: label.price130 },
			{ x: 04, y: obj.var129, date: label.date129, price: label.price129 },
			{ x: 05, y: obj.var128, date: label.date128, price: label.price128 },
			{ x: 06, y: obj.var127, date: label.date127, price: label.price127 },
			{ x: 07, y: obj.var126, date: label.date126, price: label.price126 },
			{ x: 08, y: obj.var125, date: label.date125, price: label.price125 },
			{ x: 09, y: obj.var124, date: label.date124, price: label.price124 },
			{ x: 10, y: obj.var123, date: label.date123, price: label.price123 },
			{ x: 11, y: obj.var122, date: label.date122, price: label.price122 },
			{ x: 12, y: obj.var121, date: label.date121, price: label.price121 },
			{ x: 13, y: obj.var120, date: label.date120, price: label.price120 },
			{ x: 14, y: obj.var119, date: label.date119, price: label.price119 },
			{ x: 15, y: obj.var118, date: label.date118, price: label.price118 },
			{ x: 16, y: obj.var117, date: label.date117, price: label.price117 },
			{ x: 17, y: obj.var116, date: label.date116, price: label.price116 },
			{ x: 18, y: obj.var115, date: label.date115, price: label.price115 },
			{ x: 19, y: obj.var114, date: label.date114, price: label.price114 },
			{ x: 20, y: obj.var113, date: label.date113, price: label.price113 },
			{ x: 21, y: obj.var112, date: label.date112, price: label.price112 },
			{ x: 22, y: obj.var111, date: label.date111, price: label.price111 },
			{ x: 23, y: obj.var110, date: label.date110, price: label.price110 },
			{ x: 24, y: obj.var109, date: label.date109, price: label.price109 },
			{ x: 25, y: obj.var108, date: label.date108, price: label.price108 },
			{ x: 26, y: obj.var107, date: label.date107, price: label.price107 },
			{ x: 27, y: obj.var106, date: label.date106, price: label.price106 },
			{ x: 28, y: obj.var105, date: label.date105, price: label.price105 },
			{ x: 29, y: obj.var104, date: label.date104, price: label.price104 },
			{ x: 30, y: obj.var103, date: label.date103, price: label.price103 },
			{ x: 31, y: obj.var102, date: label.date102, price: label.price102 },
			{ x: 32, y: obj.var101, date: label.date101, price: label.price101 },
			{ x: 33, y: obj.var100, date: label.date100, price: label.price100 },
			{ x: 34, y: obj.var99, date: label.date99, price: label.price99 },
			{ x: 35, y: obj.var98, date: label.date98, price: label.price98 },
			{ x: 36, y: obj.var97, date: label.date97, price: label.price97 },
			{ x: 37, y: obj.var96, date: label.date96, price: label.price96 },
			{ x: 38, y: obj.var95, date: label.date95, price: label.price95 },
			{ x: 39, y: obj.var94, date: label.date94, price: label.price94 },
			{ x: 40, y: obj.var93, date: label.date93, price: label.price93 },
			{ x: 41, y: obj.var92, date: label.date92, price: label.price92 },
			{ x: 42, y: obj.var91, date: label.date91, price: label.price91 },
			{ x: 43, y: obj.var90, date: label.date90, price: label.price90 },
			{ x: 44, y: obj.var89, date: label.date89, price: label.price89 },
			{ x: 45, y: obj.var88, date: label.date88, price: label.price88 },
			{ x: 46, y: obj.var87, date: label.date87, price: label.price87 },
			{ x: 47, y: obj.var86, date: label.date86, price: label.price86 },
			{ x: 48, y: obj.var85, date: label.date85, price: label.price85 },
			{ x: 49, y: obj.var84, date: label.date84, price: label.price84 },
			{ x: 50, y: obj.var83, date: label.date83, price: label.price83 },
			{ x: 51, y: obj.var82, date: label.date82, price: label.price82 },
			{ x: 52, y: obj.var81, date: label.date81, price: label.price81 },
			{ x: 53, y: obj.var80, date: label.date80, price: label.price80 },
			{ x: 54, y: obj.var79, date: label.date79, price: label.price79 },
			{ x: 55, y: obj.var78, date: label.date78, price: label.price78 },
			{ x: 56, y: obj.var77, date: label.date77, price: label.price77 },
			{ x: 57, y: obj.var76, date: label.date76, price: label.price76 },
			{ x: 58, y: obj.var75, date: label.date75, price: label.price75 },
			{ x: 59, y: obj.var74, date: label.date74, price: label.price74 },
			{ x: 60, y: obj.var73, date: label.date73, price: label.price73 },
			{ x: 61, y: obj.var72, date: label.date72, price: label.price72 },
			{ x: 62, y: obj.var71, date: label.date71, price: label.price71 },
			{ x: 63, y: obj.var70, date: label.date70, price: label.price70 },
			{ x: 64, y: obj.var69, date: label.date69, price: label.price69 },
			{ x: 65, y: obj.var68, date: label.date68, price: label.price68 },
			{ x: 66, y: obj.var67, date: label.date67, price: label.price67 },
			{ x: 67, y: obj.var66, date: label.date66, price: label.price66 },
			{ x: 68, y: obj.var65, date: label.date65, price: label.price65 },
      { x: 69, y: obj.var64, date: label.date64, price: label.price64 },
			{ x: 70, y: obj.var63, date: label.date63, price: label.price63 },
			{ x: 71, y: obj.var62, date: label.date62, price: label.price62 },
			{ x: 72, y: obj.var61, date: label.date61, price: label.price61 },
			{ x: 73, y: obj.var60, date: label.date60, price: label.price60 },
			{ x: 74, y: obj.var59, date: label.date59, price: label.price59 },
			{ x: 75, y: obj.var58, date: label.date58, price: label.price58 },
			{ x: 76, y: obj.var57, date: label.date57, price: label.price57 },
			{ x: 77, y: obj.var56, date: label.date56, price: label.price56 },
			{ x: 78, y: obj.var55, date: label.date55, price: label.price55 },
			{ x: 79, y: obj.var54, date: label.date54, price: label.price54 },
			{ x: 80, y: obj.var53, date: label.date53, price: label.price53 },
			{ x: 81, y: obj.var52, date: label.date52, price: label.price52 },
			{ x: 82, y: obj.var51, date: label.date51, price: label.price51 },
			{ x: 83, y: obj.var50, date: label.date50, price: label.price50 },
			{ x: 84, y: obj.var49, date: label.date49, price: label.price49 },
			{ x: 85, y: obj.var48, date: label.date48, price: label.price48 },
			{ x: 86, y: obj.var47, date: label.date47, price: label.price47 },
			{ x: 87, y: obj.var46, date: label.date46, price: label.price46 },
			{ x: 88, y: obj.var45, date: label.date45, price: label.price45 },
			{ x: 89, y: obj.var44, date: label.date44, price: label.price44 },
			{ x: 90, y: obj.var43, date: label.date43, price: label.price43 },
			{ x: 91, y: obj.var42, date: label.date42, price: label.price42 },
			{ x: 92, y: obj.var41, date: label.date41, price: label.price41 },
			{ x: 93, y: obj.var40, date: label.date40, price: label.price40 },
			{ x: 94, y: obj.var39, date: label.date39, price: label.price39 },
			{ x: 95, y: obj.var38, date: label.date38, price: label.price38 },
			{ x: 96, y: obj.var37, date: label.date37, price: label.price37 },
			{ x: 97, y: obj.var36, date: label.date36, price: label.price36 },
			{ x: 98, y: obj.var35, date: label.date35, price: label.price35 },
			{ x: 99, y: obj.var34, date: label.date34, price: label.price34 },
			{ x: 100, y: obj.var33, date: label.date33, price: label.price33 },
			{ x: 101, y: obj.var32, date: label.date32, price: label.price32 },
			{ x: 102, y: obj.var31, date: label.date31, price: label.price31 },
			{ x: 103, y: obj.var30, date: label.date30, price: label.price30 },
			{ x: 104, y: obj.var29, date: label.date29, price: label.price29 },
			{ x: 105, y: obj.var28, date: label.date28, price: label.price28 },
			{ x: 106, y: obj.var27, date: label.date27, price: label.price27 },
			{ x: 107, y: obj.var26, date: label.date26, price: label.price26 },
			{ x: 108, y: obj.var25, date: label.date25, price: label.price25 },
			{ x: 109, y: obj.var24, date: label.date24, price: label.price24 },
			{ x: 110, y: obj.var23, date: label.date23, price: label.price23 },
			{ x: 111, y: obj.var22, date: label.date22, price: label.price22 },
			{ x: 112, y: obj.var21, date: label.date21, price: label.price21 },
			{ x: 113, y: obj.var20, date: label.date20, price: label.price20 },
			{ x: 114, y: obj.var19, date: label.date19, price: label.price19 },
			{ x: 115, y: obj.var18, date: label.date18, price: label.price18 },
			{ x: 116, y: obj.var17, date: label.date17, price: label.price17 },
			{ x: 117, y: obj.var16, date: label.date16, price: label.price16 },
			{ x: 118, y: obj.var15, date: label.date15, price: label.price15 },
			{ x: 119, y: obj.var14, date: label.date14, price: label.price14 },
			{ x: 120, y: obj.var13, date: label.date13, price: label.price13 },
			{ x: 121, y: obj.var12, date: label.date12, price: label.price12 },
			{ x: 122, y: obj.var11, date: label.date11, price: label.price11 },
			{ x: 123, y: obj.var10, date: label.date10, price: label.price10 },
			{ x: 124, y: obj.var9, date: label.date9, price: label.price9 },
			{ x: 125, y: obj.var8, date: label.date8, price: label.price8 },
			{ x: 126, y: obj.var7, date: label.date7, price: label.price7 },
			{ x: 127, y: obj.var6, date: label.date6, price: label.price6 },
			{ x: 128, y: obj.var5, date: label.date5, price: label.price5 },
			{ x: 129, y: obj.var4, date: label.date4, price: label.price4 },
			{ x: 130, y: obj.var3, date: label.date3, price: label.price3 },
			{ x: 131, y: obj.var2, date: label.date2, price: label.price2 },
			{ x: 132, y: obj.var1, date: label.date1, price: label.price1 },
		]
	},
	],
      axisX: {
        title: "",
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        labelFontSize: "0"
      },
      axisY: {
      	minimum: min * 0.999,
      	maximum: max * 1.001,
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        stripLines:[{
  				value: obj[Object.keys(obj)[totalReturned-1]],
          lineDashType: "dash",
          color: "#979797",
          showOnTop: false,
          thickness: 2
  			}]
      },
      toolTip:{
        content: "<span style='\"'color: #979797;'\"'>{date}</span><br/>${price}",
        backgroundColor: tooltipBGColor,
        borderThickness: 0,
        fontFamily: "Ropa Sans",
        fontSize: 20,
        fontStyle: "normal",
        fontColor: lineColor,
        animationEnabled: true,
      },
	});

	});
  var difference = document.querySelector(".difference");
  difference.textContent = "PAST 6M: " + Number(stock.quote.price - obj[Object.keys(obj)[totalReturned-1]]).toFixed(2) + " (" + (((Number(stock.quote.price).toFixed(2) - obj[Object.keys(obj)[totalReturned-1]])/obj[Object.keys(obj)[totalReturned-1]])*100).toFixed(2) + "%)";
  $(".difference").css("color", lineColor);

}

function updateChart1Y() {
	console.log("updateChart1Y");

  var arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });
  var min = Math.min.apply( null, arr );
  var max = Math.max.apply( null, arr );
  var tooltipBGColor = $("body").css('background-color').replace(')', ', 0.7)').replace('rgb', 'rgba');

  for (var i = 255; i > totalReturned; i--) {
    obj["var" + i] = null;
    label["date" + i] = null;
    label["price" + i] = null;
  }

	$(function () {
	$("#chart").CanvasJSChart({ //Pass chart options
    backgroundColor: $("body").css('background-color'),
		data: [
		{
		type: "line", //change it to column, spline, line, pie, etc
		color: lineColor,
    markerBorderColor: lineColor,
    markerBorderThickness: 2,
    markerColor: $("body").css('background-color'),
		markerSize: 1,
		dataPoints: [ //26 updates intra-day, <23 days for 1M, <69 days for 3M, <138 days for 6M, <276 days for 1Y
			{ x:1 , y: obj.var255, date: label.date255, price: label.price255 },
			{ x:2 , y: obj.var254, date: label.date254, price: label.price254 },
			{ x:3 , y: obj.var253, date: label.date253, price: label.price253 },
			{ x:4 , y: obj.var252, date: label.date252, price: label.price252 },
			{ x:5 , y: obj.var251, date: label.date251, price: label.price251 },
			{ x:6 , y: obj.var250, date: label.date250, price: label.price250 },
			{ x:7 , y: obj.var249, date: label.date249, price: label.price249 },
			{ x:8 , y: obj.var248, date: label.date248, price: label.price248 },
			{ x:9 , y: obj.var247, date: label.date247, price: label.price247 },
			{ x:10 , y: obj.var246, date: label.date246, price: label.price246 },
			{ x:11 , y: obj.var245, date: label.date245, price: label.price245 },
			{ x:12 , y: obj.var244, date: label.date244, price: label.price244 },
			{ x:13 , y: obj.var243, date: label.date243, price: label.price243 },
			{ x:14 , y: obj.var242, date: label.date242, price: label.price242 },
			{ x:15 , y: obj.var241, date: label.date241, price: label.price241 },
			{ x:16 , y: obj.var240, date: label.date240, price: label.price240 },
			{ x:17 , y: obj.var239, date: label.date239, price: label.price239 },
			{ x:18 , y: obj.var238, date: label.date238, price: label.price238 },
			{ x:19 , y: obj.var237, date: label.date237, price: label.price237 },
			{ x:20 , y: obj.var236, date: label.date236, price: label.price236 },
			{ x:21 , y: obj.var235, date: label.date235, price: label.price235 },
			{ x:22 , y: obj.var234, date: label.date234, price: label.price234 },
			{ x:23 , y: obj.var233, date: label.date233, price: label.price233 },
			{ x:24 , y: obj.var232, date: label.date232, price: label.price232 },
			{ x:25 , y: obj.var231, date: label.date231, price: label.price231 },
			{ x:26 , y: obj.var230, date: label.date230, price: label.price230 },
			{ x:27 , y: obj.var229, date: label.date229, price: label.price229 },
			{ x:28 , y: obj.var228, date: label.date228, price: label.price228 },
			{ x:29 , y: obj.var227, date: label.date227, price: label.price227 },
			{ x:30 , y: obj.var226, date: label.date226, price: label.price226 },
			{ x:31 , y: obj.var225, date: label.date225, price: label.price225 },
			{ x:32 , y: obj.var224, date: label.date224, price: label.price224 },
			{ x:33 , y: obj.var223, date: label.date223, price: label.price223 },
			{ x:34 , y: obj.var222, date: label.date222, price: label.price222 },
			{ x:35 , y: obj.var221, date: label.date221, price: label.price221 },
			{ x:36 , y: obj.var220, date: label.date220, price: label.price220 },
			{ x:37 , y: obj.var219, date: label.date219, price: label.price219 },
			{ x:38 , y: obj.var218, date: label.date218, price: label.price218 },
			{ x:39 , y: obj.var217, date: label.date217, price: label.price217 },
			{ x:40 , y: obj.var216, date: label.date216, price: label.price216 },
			{ x:41 , y: obj.var215, date: label.date215, price: label.price215 },
			{ x:42 , y: obj.var214, date: label.date214, price: label.price214 },
			{ x:43 , y: obj.var213, date: label.date213, price: label.price213 },
			{ x:44 , y: obj.var212, date: label.date212, price: label.price212 },
			{ x:45 , y: obj.var211, date: label.date211, price: label.price211 },
			{ x:46 , y: obj.var210, date: label.date210, price: label.price210 },
			{ x:47 , y: obj.var209, date: label.date209, price: label.price209 },
			{ x:48 , y: obj.var208, date: label.date208, price: label.price208 },
			{ x:49 , y: obj.var207, date: label.date207, price: label.price207 },
			{ x:50 , y: obj.var206, date: label.date206, price: label.price206 },
			{ x:51 , y: obj.var205, date: label.date205, price: label.price205 },
			{ x:52 , y: obj.var204, date: label.date204, price: label.price204 },
			{ x:53 , y: obj.var203, date: label.date203, price: label.price203 },
			{ x:54 , y: obj.var202, date: label.date202, price: label.price202 },
			{ x:55 , y: obj.var201, date: label.date201, price: label.price201 },
			{ x:56 , y: obj.var200, date: label.date200, price: label.price200 },
			{ x:57 , y: obj.var199, date: label.date199, price: label.price199 },
			{ x:58 , y: obj.var198, date: label.date198, price: label.price198 },
			{ x:59 , y: obj.var197, date: label.date197, price: label.price197 },
			{ x:60 , y: obj.var196, date: label.date196, price: label.price196 },
			{ x:61 , y: obj.var195, date: label.date195, price: label.price195 },
			{ x:62 , y: obj.var194, date: label.date194, price: label.price194 },
			{ x:63 , y: obj.var193, date: label.date193, price: label.price193 },
			{ x:64 , y: obj.var192, date: label.date192, price: label.price192 },
			{ x:65 , y: obj.var191, date: label.date191, price: label.price191 },
			{ x:66 , y: obj.var190, date: label.date190, price: label.price190 },
			{ x:67 , y: obj.var189, date: label.date189, price: label.price189 },
			{ x:68 , y: obj.var188, date: label.date188, price: label.price188 },
      { x:69 , y: obj.var187, date: label.date187, price: label.price187 },
			{ x:70 , y: obj.var186, date: label.date186, price: label.price186 },
			{ x:71 , y: obj.var185, date: label.date185, price: label.price185 },
			{ x:72 , y: obj.var184, date: label.date184, price: label.price184 },
			{ x:73 , y: obj.var183, date: label.date183, price: label.price183 },
			{ x:74 , y: obj.var182, date: label.date182, price: label.price182 },
			{ x:75 , y: obj.var181, date: label.date181, price: label.price181 },
			{ x:76 , y: obj.var180, date: label.date180, price: label.price180 },
			{ x:77 , y: obj.var179, date: label.date179, price: label.price179 },
			{ x:78 , y: obj.var178, date: label.date178, price: label.price178 },
			{ x:79 , y: obj.var177, date: label.date177, price: label.price177 },
			{ x:80 , y: obj.var176, date: label.date176, price: label.price176 },
			{ x:81 , y: obj.var175, date: label.date175, price: label.price175 },
			{ x:82 , y: obj.var174, date: label.date174, price: label.price174 },
			{ x:83 , y: obj.var173, date: label.date173, price: label.price173 },
			{ x:84 , y: obj.var172, date: label.date172, price: label.price172 },
			{ x:85 , y: obj.var171, date: label.date171, price: label.price171 },
			{ x:86 , y: obj.var170, date: label.date170, price: label.price170 },
			{ x:87 , y: obj.var169, date: label.date169, price: label.price169 },
			{ x:88 , y: obj.var168, date: label.date168, price: label.price168 },
			{ x:89 , y: obj.var167, date: label.date167, price: label.price167 },
			{ x:90 , y: obj.var166, date: label.date166, price: label.price166 },
			{ x:91 , y: obj.var165, date: label.date165, price: label.price165 },
			{ x:92 , y: obj.var164, date: label.date164, price: label.price164 },
			{ x:93 , y: obj.var163, date: label.date163, price: label.price163 },
			{ x:94 , y: obj.var162, date: label.date162, price: label.price162 },
			{ x:95 , y: obj.var161, date: label.date161, price: label.price161 },
			{ x:96 , y: obj.var160, date: label.date160, price: label.price160 },
			{ x:97 , y: obj.var159, date: label.date159, price: label.price159 },
			{ x:98 , y: obj.var158, date: label.date158, price: label.price158 },
			{ x:99 , y: obj.var157, date: label.date157, price: label.price157 },
			{ x:100 , y: obj.var156, date: label.date156, price: label.price156 },
			{ x:101 , y: obj.var155, date: label.date155, price: label.price155 },
			{ x:102 , y: obj.var154, date: label.date154, price: label.price154 },
			{ x:103 , y: obj.var153, date: label.date153, price: label.price153 },
			{ x:104 , y: obj.var152, date: label.date152, price: label.price152 },
			{ x:105 , y: obj.var151, date: label.date151, price: label.price151 },
			{ x:106 , y: obj.var150, date: label.date150, price: label.price150 },
			{ x:107 , y: obj.var149, date: label.date149, price: label.price149 },
			{ x:108 , y: obj.var148, date: label.date148, price: label.price148 },
			{ x:109 , y: obj.var147, date: label.date147, price: label.price147 },
			{ x:110 , y: obj.var146, date: label.date146, price: label.price146 },
			{ x:111 , y: obj.var145, date: label.date145, price: label.price145 },
			{ x:112 , y: obj.var144, date: label.date144, price: label.price144 },
			{ x:113 , y: obj.var143, date: label.date143, price: label.price143 },
			{ x:114 , y: obj.var142, date: label.date142, price: label.price142 },
			{ x:115 , y: obj.var141, date: label.date141, price: label.price141 },
			{ x:116 , y: obj.var140, date: label.date140, price: label.price140 },
			{ x:117 , y: obj.var139, date: label.date139, price: label.price139 },
			{ x:118 , y: obj.var138, date: label.date138, price: label.price138 },
			{ x:119 , y: obj.var137, date: label.date137, price: label.price137 },
			{ x:120 , y: obj.var136, date: label.date136, price: label.price136 },
			{ x:121 , y: obj.var135, date: label.date135, price: label.price135 },
			{ x:122 , y: obj.var134, date: label.date134, price: label.price134 },
			{ x:123 , y: obj.var133, date: label.date133, price: label.price133 },
			{ x:124 , y: obj.var132, date: label.date132, price: label.price132 },
			{ x:125 , y: obj.var131, date: label.date131, price: label.price131 },
			{ x:126 , y: obj.var130, date: label.date130, price: label.price130 },
			{ x:127 , y: obj.var129, date: label.date129, price: label.price129 },
			{ x:128 , y: obj.var128, date: label.date128, price: label.price128 },
			{ x:129 , y: obj.var127, date: label.date127, price: label.price127 },
			{ x:130 , y: obj.var126, date: label.date126, price: label.price126 },
			{ x:131 , y: obj.var125, date: label.date125, price: label.price125 },
			{ x:132 , y: obj.var124, date: label.date124, price: label.price124 },
			{ x:133 , y: obj.var123, date: label.date123, price: label.price123 },
			{ x:134 , y: obj.var122, date: label.date122, price: label.price122 },
			{ x:135 , y: obj.var121, date: label.date121, price: label.price121 },
			{ x:136 , y: obj.var120, date: label.date120, price: label.price120 },
      { x:137 , y: obj.var119, date: label.date119, price: label.price119 },
			{ x:138 , y: obj.var118, date: label.date118, price: label.price118 },
      { x:139 , y: obj.var117, date: label.date117, price: label.price117 },
			{ x:140 , y: obj.var116, date: label.date116, price: label.price116 },
			{ x:141 , y: obj.var115, date: label.date115, price: label.price115 },
			{ x:142 , y: obj.var114, date: label.date114, price: label.price114 },
			{ x:143 , y: obj.var113, date: label.date113, price: label.price113 },
			{ x:144 , y: obj.var112, date: label.date112, price: label.price112 },
			{ x:145 , y: obj.var111, date: label.date111, price: label.price111 },
			{ x:146 , y: obj.var110, date: label.date110, price: label.price110 },
			{ x:147 , y: obj.var109, date: label.date109, price: label.price109 },
			{ x:148 , y: obj.var108, date: label.date108, price: label.price108 },
			{ x:149 , y: obj.var107, date: label.date107, price: label.price107 },
			{ x:150 , y: obj.var106, date: label.date106, price: label.price106 },
			{ x:151 , y: obj.var105, date: label.date105, price: label.price105 },
			{ x:152 , y: obj.var104, date: label.date104, price: label.price104 },
			{ x:153 , y: obj.var103, date: label.date103, price: label.price103 },
			{ x:154 , y: obj.var102, date: label.date102, price: label.price102 },
			{ x:155 , y: obj.var101, date: label.date101, price: label.price101 },
			{ x:156 , y: obj.var100, date: label.date100, price: label.price100 },
			{ x:157 , y: obj.var99, date: label.date99, price: label.price99 },
			{ x:158 , y: obj.var98, date: label.date98, price: label.price98 },
			{ x:159 , y: obj.var97, date: label.date97, price: label.price97 },
			{ x:160 , y: obj.var96, date: label.date96, price: label.price96 },
			{ x:161 , y: obj.var95, date: label.date95, price: label.price95 },
			{ x:162 , y: obj.var94, date: label.date94, price: label.price94 },
			{ x:163 , y: obj.var93, date: label.date93, price: label.price93 },
			{ x:164 , y: obj.var92, date: label.date92, price: label.price92 },
			{ x:165 , y: obj.var91, date: label.date91, price: label.price91 },
			{ x:166 , y: obj.var90, date: label.date90, price: label.price90 },
			{ x:167 , y: obj.var89, date: label.date89, price: label.price89 },
			{ x:168 , y: obj.var88, date: label.date88, price: label.price88 },
			{ x:169 , y: obj.var87, date: label.date87, price: label.price87 },
			{ x:170 , y: obj.var86, date: label.date86, price: label.price86 },
			{ x:171 , y: obj.var85, date: label.date85, price: label.price85 },
			{ x:172 , y: obj.var84, date: label.date84, price: label.price84 },
			{ x:173 , y: obj.var83, date: label.date83, price: label.price83 },
			{ x:174 , y: obj.var82, date: label.date82, price: label.price82 },
			{ x:175 , y: obj.var81, date: label.date81, price: label.price81 },
			{ x:176 , y: obj.var80, date: label.date80, price: label.price80 },
			{ x:177 , y: obj.var79, date: label.date79, price: label.price79 },
			{ x:178 , y: obj.var78, date: label.date78, price: label.price78 },
			{ x:179 , y: obj.var77, date: label.date77, price: label.price77 },
			{ x:180 , y: obj.var76, date: label.date76, price: label.price76 },
			{ x:181 , y: obj.var75, date: label.date75, price: label.price75 },
			{ x:182 , y: obj.var74, date: label.date74, price: label.price74 },
			{ x:183 , y: obj.var73, date: label.date73, price: label.price73 },
			{ x:184 , y: obj.var72, date: label.date72, price: label.price72 },
			{ x:185 , y: obj.var71, date: label.date71, price: label.price71 },
			{ x:186 , y: obj.var70, date: label.date70, price: label.price70 },
			{ x:187 , y: obj.var69, date: label.date69, price: label.price69 },
			{ x:188 , y: obj.var68, date: label.date68, price: label.price68 },
			{ x:189 , y: obj.var67, date: label.date67, price: label.price67 },
			{ x:190 , y: obj.var66, date: label.date66, price: label.price66 },
			{ x:191 , y: obj.var65, date: label.date65, price: label.price65 },
			{ x:192 , y: obj.var64, date: label.date64, price: label.price64 },
			{ x:193 , y: obj.var63, date: label.date63, price: label.price63 },
			{ x:194 , y: obj.var62, date: label.date62, price: label.price62 },
			{ x:195 , y: obj.var61, date: label.date61, price: label.price61 },
			{ x:196 , y: obj.var60, date: label.date60, price: label.price60 },
			{ x:197 , y: obj.var59, date: label.date59, price: label.price59 },
			{ x:198 , y: obj.var58, date: label.date58, price: label.price58 },
			{ x:199 , y: obj.var57, date: label.date57, price: label.price57 },
			{ x:200 , y: obj.var56, date: label.date56, price: label.price56 },
			{ x:201 , y: obj.var55, date: label.date55, price: label.price55 },
			{ x:202 , y: obj.var54, date: label.date54, price: label.price54 },
			{ x:203 , y: obj.var53, date: label.date53, price: label.price53 },
			{ x:204 , y: obj.var52, date: label.date52, price: label.price52 },
			{ x:205 , y: obj.var51, date: label.date51, price: label.price51 },
			{ x:206 , y: obj.var50, date: label.date50, price: label.price50 },
      { x:207 , y: obj.var49, date: label.date49, price: label.price49 },
			{ x:208 , y: obj.var48, date: label.date48, price: label.price48 },
			{ x:209 , y: obj.var47, date: label.date47, price: label.price47 },
			{ x:210 , y: obj.var46, date: label.date46, price: label.price46 },
			{ x:211 , y: obj.var45, date: label.date45, price: label.price45 },
			{ x:212 , y: obj.var44, date: label.date44, price: label.price44 },
			{ x:213 , y: obj.var43, date: label.date43, price: label.price43 },
			{ x:214 , y: obj.var42, date: label.date42, price: label.price42 },
			{ x:215 , y: obj.var41, date: label.date41, price: label.price41 },
			{ x:216 , y: obj.var40, date: label.date40, price: label.price40 },
			{ x:217 , y: obj.var39, date: label.date39, price: label.price39 },
			{ x:218 , y: obj.var38, date: label.date38, price: label.price38 },
			{ x:219 , y: obj.var37, date: label.date37, price: label.price37 },
			{ x:220 , y: obj.var36, date: label.date36, price: label.price36 },
			{ x:221 , y: obj.var35, date: label.date35, price: label.price35 },
			{ x:222 , y: obj.var34, date: label.date34, price: label.price34 },
			{ x:223 , y: obj.var33, date: label.date33, price: label.price33 },
			{ x:224 , y: obj.var32, date: label.date32, price: label.price32 },
			{ x:225 , y: obj.var31, date: label.date31, price: label.price31 },
			{ x:226 , y: obj.var30, date: label.date30, price: label.price30 },
			{ x:227 , y: obj.var29, date: label.date29, price: label.price29 },
			{ x:228 , y: obj.var28, date: label.date28, price: label.price28 },
			{ x:229 , y: obj.var27, date: label.date27, price: label.price27 },
			{ x:230 , y: obj.var26, date: label.date26, price: label.price26 },
			{ x:231 , y: obj.var25, date: label.date25, price: label.price25 },
			{ x:232 , y: obj.var24, date: label.date24, price: label.price24 },
			{ x:233 , y: obj.var23, date: label.date23, price: label.price23 },
			{ x:234 , y: obj.var22, date: label.date22, price: label.price22 },
			{ x:235 , y: obj.var21, date: label.date21, price: label.price21 },
			{ x:236 , y: obj.var20, date: label.date20, price: label.price20 },
			{ x:237 , y: obj.var19, date: label.date19, price: label.price19 },
			{ x:238 , y: obj.var18, date: label.date18, price: label.price18 },
			{ x:239 , y: obj.var17, date: label.date17, price: label.price17 },
			{ x:240 , y: obj.var16, date: label.date16, price: label.price16 },
			{ x:241 , y: obj.var15, date: label.date15, price: label.price15 },
			{ x:242 , y: obj.var14, date: label.date14, price: label.price14 },
			{ x:243 , y: obj.var13, date: label.date13, price: label.price13 },
			{ x:244 , y: obj.var12, date: label.date12, price: label.price12 },
			{ x:245 , y: obj.var11, date: label.date11, price: label.price11 },
			{ x:246 , y: obj.var10, date: label.date10, price: label.price10 },
			{ x:247 , y: obj.var9, date: label.date9, price: label.price9 },
			{ x:248 , y: obj.var8, date: label.date8, price: label.price8 },
			{ x:249 , y: obj.var7, date: label.date7, price: label.price7 },
			{ x:250 , y: obj.var6, date: label.date6, price: label.price6 },
			{ x:251 , y: obj.var5, date: label.date5, price: label.price5 },
			{ x:252 , y: obj.var4, date: label.date4, price: label.price4 },
      { x:253 , y: obj.var3, date: label.date3, price: label.price3 },
			{ x:254 , y: obj.var2, date: label.date2, price: label.price2 },
			{ x:255 , y: obj.var1, date: label.date1, price: label.price1 },
		]
	},
	],
      axisX: {
        title: "",
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        labelFontSize: "0"
      },
      axisY: {
      	minimum: min * 0.999,
      	maximum: max * 1.001,
        lineThickness: 0,
        gridThickness: 0,
        valueFormatString: " ",
        tickThickness: 0,
        stripLines:[{
  				value: obj[Object.keys(obj)[totalReturned-1]],
          lineDashType: "dash",
          color: "#979797",
          showOnTop: false,
          thickness: 2
  			}]
      },
      toolTip:{
        content: "<span style='\"'color: #979797;'\"'>{date}</span><br/>${price}",
        backgroundColor: tooltipBGColor,
        borderThickness: 0,
        fontFamily: "Ropa Sans",
        fontSize: 20,
        fontStyle: "normal",
        fontColor: lineColor,
        animationEnabled: true
      },
	});

	});
  var difference = document.querySelector(".difference");
  difference.textContent = "PAST YEAR: " + Number(stock.quote.price - obj[Object.keys(obj)[totalReturned-1]]).toFixed(2) + " (" + (((Number(stock.quote.price).toFixed(2) - obj[Object.keys(obj)[totalReturned-1]])/obj[Object.keys(obj)[totalReturned-1]])*100).toFixed(2) + "%)";
  $(".difference").css("color", lineColor);

}
