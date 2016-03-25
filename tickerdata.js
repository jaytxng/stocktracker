//Structure
var form = document.querySelector("form");
var search = document.querySelector("input");
var chart = document.querySelector(".chart");

var data = document.querySelector(".data");
var stockSymbol = document.querySelector(".stockSymbol");
var stockName = document.querySelector(".stockName");
var stockPrice = document.querySelector(".stockPrice");
var dollarSign = document.querySelector(".dollarSign");
var middlePrice = document.querySelector(".middlePrice");
var lastThree = document.querySelector(".lastThree");
var stockOpen = document.querySelector(".stockOpen");
var stockDaysHigh = document.querySelector(".stockDaysHigh");
var stockDaysLow = document.querySelector(".stockDaysLow");
var stockYearHigh = document.querySelector(".stockYearHigh");
var stockYearLow = document.querySelector(".stockYearLow");
var stockVolume = document.querySelector(".stockVolume");
var stockAverageDailyVolume = document.querySelector(".stockAverageDailyVolume");
var stockMarketCapitalization = document.querySelector(".stockMarketCapitalization");
var stockPERatio = document.querySelector(".stockPERatio");
var stockPreviousClose = document.querySelector(".stockPreviousClose");
var stock = {
	"quote":
		{
			"symbol":"",
			"price":"",
			"name":"",
			"open":"",
			"dayshigh":"",
			"dayslow":"",
			"yearhigh":"",
			"yearlow":"",
			"volume":"",
			"averagedailyvolume":"",
			"marketcap":"",
			"peratio":"",
			"previousclose":""
		}
	};
var runCount = 0;

//Events
form.addEventListener("submit", getStock);

//Event handler functions

// getJSON
function getStock() {
	event.preventDefault();
	for (i = 0; i < Object.keys(searchResults).length/2; i++) {
		if (datalist.children[i].style.color == "rgb(163, 169, 171)") {
			search.value = searchResults["symbol" + (i + 1)];
		} else {
			//do nothing
		}
	}
	getJSON();
}

function getJSON() {

	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+search.value+"%22)%0A%09%09&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=";
	jQuery.getJSON(url, updateStocks);
	runCount = 12;
	form.reset();
	$('#input').focus();
	$('#datalist').html('');
}

window.setInterval( function() {
	if ($("body").css('background-color') == "rgb(4, 13, 20)" || ($("body").css('background-color') !== "rgb(4, 13, 20)" && $(".1D a").css('color') == "rgb(88, 100, 104)")) {
		//don't run anything
	}	else {
		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+stock.quote.symbol+"%22)%0A%09%09&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=";
		jQuery.getJSON(url, updateStocks);
		$('.middlePrice').fadeOut(200);
		$('.lastThree').fadeOut(200);
		console.log("current price updated");
		runCount++;
	}
	getLearned();
}, 5000); // keep in mind that interval ties with run count of 12 to get one minute reset for getChart1D

function updateStocks(json) {
	console.log("updateStocks");

	if (json.query.results.quote.LastTradePriceOnly === null) { //verify it's a valid stock symbol
		//do nothing
		$('#input').attr("placeholder", " Invalid stock symbol");
	} else {

		$('#input').attr("placeholder", " Search company or stock symbol...");

		$('.midleft').show();
		$('.midright').show();
		$('.timeline').show();

		// unpacking the json and adding to stock array
		stock.quote.symbol = json.query.results.quote.symbol;
		stock.quote.name = json.query.results.quote.Name;
		stock.quote.price = json.query.results.quote.LastTradePriceOnly;
		stock.quote.open = json.query.results.quote.Open;
		stock.quote.dayshigh = json.query.results.quote.DaysHigh;
		stock.quote.dayslow = json.query.results.quote.DaysLow;
		stock.quote.yearhigh = json.query.results.quote.YearHigh;
		stock.quote.yearlow = json.query.results.quote.YearLow;
		stock.quote.volume = json.query.results.quote.Volume;
		stock.quote.averagedailyvolume = json.query.results.quote.AverageDailyVolume;
		stock.quote.marketcap = json.query.results.quote.MarketCapitalization;
		stock.quote.peratio = json.query.results.quote.PERatio;
		stock.quote.previousclose = json.query.results.quote.PreviousClose;

		addData();
		setSymbol();

	}
}

//display data points
function addData () {

	$('li').remove();

	stockSymbol.textContent = stock.quote.symbol+' - ';
	stockName.textContent = stock.quote.name;

	middlePrice.textContent = Number(stock.quote.price).toFixed(2).slice(0, -3);
	dollarSign.textContent = "$";
	lastThree.textContent = Number(stock.quote.price).toFixed(2).substr(Number(stock.quote.price).toFixed(2).length - 3);
	stockOpen.textContent = Number(stock.quote.open).toFixed(2);
	stockDaysHigh.textContent = Number(stock.quote.dayshigh).toFixed(2);
	stockDaysLow.textContent = Number(stock.quote.dayslow).toFixed(2);
	stockYearHigh.textContent = Number(stock.quote.yearhigh).toFixed(2);
	stockYearLow.textContent = Number(stock.quote.yearlow).toFixed(2);
	stockVolume.textContent = stock.quote.volume.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	stockAverageDailyVolume.textContent = stock.quote.averagedailyvolume.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	stockMarketCapitalization.textContent = stock.quote.marketcap;
	stockPERatio.textContent = Number(stock.quote.peratio).toFixed(2) || "N/A";
	stockPreviousClose.textContent = Number(stock.quote.previousclose).toFixed(2);

	$('.middlePrice').fadeIn(200);
	$('.lastThree').fadeIn(100);

	if (runCount >= 12) {
		getChart1D();
		runCount = 0;
	}

	// getNews();

}


// TODO mobile opti
// TODO save past searches into localStorage
