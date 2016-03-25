var searchResults = {};
var numberResults = "";
var datalist = document.querySelector("#datalist");
var selectCount = -1;


//grab data from symbol lookup
$('#input').keyup( function(e) {
  if (e.which !== 13 && e.which !== 38 && e.which !== 40) {
    var url = "https://s.yimg.com/aq/autoc?query="+search.value+"&region=US&lang=en-US";

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(results) {

        numberResults = results.ResultSet.Result.length;
        searchResults = {};
        $('#datalist').html('');
        selectCount = -1;

        for (var i = 0; i < 5; ++i) {
          if (results.ResultSet.Result[i].type == "S") {
            searchResults["name" + (i + 1)] = results.ResultSet.Result[i].name;
            searchResults["symbol" + (i + 1)] = results.ResultSet.Result[i].symbol;
            // searchResults["type" + (i + 1)] = results.ResultSet.Result[i].type;
          } else {
            //do nothing
          }
        }

        insertResults();

      }
    });
  } else {
    //do nothing
  }
});

//insert data from searchResults to dropdown results
function insertResults() {

  for (var i = 0; i < numberResults; ++i) {
    if (typeof searchResults["name" + (i + 1)] === 'undefined') {
      //do nothing
    } else {
      var line = document.createElement("p");
      line.innerHTML = searchResults["symbol" + (i + 1)] + " - " + searchResults["name" + (i + 1)];
      document.getElementById("datalist").appendChild(line);

      $("#datalist").children().each(function(index) {
        $(this).hide().delay(50*index).fadeIn(100);
      });
    }
  }
}

//change select by pressing up/down buttons
$('#input').keydown( function(e) {
  if (e.which == 40) {
    if (selectCount < Object.keys(searchResults).length/2 - 1) {
      selectCount += 1;
    } else {
      //do nothing
    }
    for (i = 0; i < Object.keys(searchResults).length/2; i++) {
      datalist.children[i].style.color = "rgb(88, 100, 104)";
    }
    datalist.children[selectCount].style.color = "rgb(163, 169, 171)";
  } if (e.which == 38) {
      if (selectCount > -1) {
        selectCount -= 1;
      } else {
        //do nothing
      }
    for (i = 0; i < Object.keys(searchResults).length/2; i++) {
      datalist.children[i].style.color = "rgb(88, 100, 104)";
    }
    datalist.children[selectCount].style.color = "rgb(163, 169, 171)";
  } else {
    // do nothing
  }
});

$('#datalist').on('click', function (e) {
    //e.target is the initial target of the element
    search.value = e.target.innerHTML.split(' ')[0];
    getJSON();
});
