var pastsearches = document.querySelector(".past_searches");
var searcharray = [];
var searchhistory = [];
var searchCount = -1;

//loading past searches
$('#input').keydown( function(e) {
  if (e.which == 13 && $.inArray(stock.quote.symbol, searchhistory) == -1) {
    searchitem = stock.quote.symbol;
    searchhistory.unshift(searchitem);

    searchElement = $('<a />').html(stock.quote.symbol + " " + stock.quote.price);
    searcharray.unshift(searchElement);

    searcharray = searcharray.slice(0, 10);

    pastsearches.innerHTML = "";
    $( ".past_searches" ).append(searcharray);

  } else {
    //do nothing
  }
});

//clicking on past searches
$('.past_searches').on('click', function (e) {

    if ($.inArray(stock.quote.symbol, searchhistory) == -1) {
      searchitem = stock.quote.symbol;
      searchhistory.unshift(searchitem);

      searchElement = $('<a />').html(stock.quote.symbol + " " + stock.quote.price);
      searcharray.unshift(searchElement);

      searcharray = searcharray.slice(0, 10);

      pastsearches.innerHTML = "";
      $( ".past_searches" ).append(searcharray);
    }

    search.value = e.target.innerHTML.split(' ')[0];
    getJSON();
});

//left & right keys for going to next/previous past searches
$('#input').keyup( function (e) {

  if (e.which == 39) {
    if (searchCount < searcharray.length - 1) {
      searchCount += 1;
    } else {
      //do nothing
    }
    for (i = 0; i < searcharray.length; i++) {
      pastsearches.children[i].style.color = "rgb(88, 100, 104)";

      search.value = pastsearches.children[searchCount].innerHTML.split(' ')[0];
      getJSON();
    }
    pastsearches.children[searchCount].style.color = "rgb(163, 169, 171)";
  } if (e.which == 37) {
      if (searchCount > -1) {
        searchCount -= 1;
      } else {
        //do nothing
      }
    for (i = 0; i < searcharray.length; i++) {
      pastsearches.children[i].style.color = "rgb(88, 100, 104)";
    }
    pastsearches.children[searchCount].style.color = "rgb(163, 169, 171)";

    search.value = pastsearches.children[searchCount].innerHTML.split(' ')[0];
    getJSON();
  } else {
    // do nothing
  }


});
