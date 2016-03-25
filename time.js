var timeNY = moment.tz("America/New_York").format('d HH:mm');
var timeNYHour = Number(timeNY.slice(2, -3));
var timeNYMinute = Number(timeNY.slice(5, 7));
var timeNYDay = Number(timeNY.slice(0, 1));
var dataColor = document.getElementsByClassName('data');
var currentPrice = document.getElementsByClassName('focus-price');

//change CSS depending on stock market opening or not
window.onload = function changeCSS() {

  if ((timeNYDay >= 1 && timeNYDay <= 5) && ((timeNYHour >= 10 && timeNYHour < 16) || (timeNYHour == 9 && timeNYMinute >= 30))) {
      document.querySelector("body").style.backgroundColor = "#EEEEEE";

      for (var i = 0; i < dataColor.length; i++) {
        dataColor[i].style.color = "#000000";
      }

      document.querySelector(".stockSymbol").style.color = "#000000";

      for (i = 0; i < currentPrice.length; i++) {
        currentPrice[i].style.color = "#000000";
        currentPrice[0].style.textShadow = "2px 4px 2px #B2B2B2";
        currentPrice[1].style.textShadow = "2px 8px 2px #B2B2B2";
        currentPrice[2].style.textShadow = "2px 4px 2px #B2B2B2";
      }
  } else {
        document.querySelector("body").style.backgroundColor = "#040D14";

        for (i = 0; i < dataColor.length; i++) {
          dataColor[i].style.color = "#FFFFFF";
        }

        document.querySelector(".stockSymbol").style.color = "#FFFFFF";

        for (i = 0; i < currentPrice.length; i++) {
          currentPrice[i].style.color = "#FFFFFF";
          currentPrice[0].style.textShadow = "2px 4px 2px #42494E";
          currentPrice[1].style.textShadow = "2px 8px 2px #42494E";
          currentPrice[2].style.textShadow = "2px 4px 2px #42494E";

        }
    }

  console.log("time checked at " + timeNY);
  getLearned();

  if (localStorage.symbol != null) {
      getSymbol();
      getStock();
  } else {
    $('.keyboard').hide();
    $('.midleft').hide();
    $('.midright').hide();
    $('.timeline').hide();
  }


};

window.setInterval( function() {
  timeNY = moment.tz("America/New_York").format('d HH:mm');
  timeNYHour = Number(timeNY.slice(2, -3));
  timeNYMinute = Number(timeNY.slice(5, 7));
  timeNYDay = Number(timeNY.slice(0, 1));

  if ((timeNYDay >= 1 && timeNYDay <= 5) && ((timeNYHour >= 10 && timeNYHour < 16) || (timeNYHour == 9 && timeNYMinute >= 30))) {
    document.querySelector("body").style.backgroundColor = "#EEEEEE";

    for (i = 0; i < dataColor.length; i++) {
      dataColor[i].style.color = "#000000";
    }

    document.querySelector(".stockSymbol").style.color = "#000000";

    for (i = 0; i < currentPrice.length; i++) {
      currentPrice[i].style.color = "#000000";
      currentPrice[0].style.textShadow = "2px 4px 2px #B2B2B2";
      currentPrice[1].style.textShadow = "2px 8px 2px #B2B2B2";
      currentPrice[2].style.textShadow = "2px 4px 2px #B2B2B2";
    }
  } else {
        document.querySelector("body").style.backgroundColor = "#040D14";

        for (var i = 0; i < dataColor.length; i++) {
          dataColor[i].style.color = "#FFFFFF";
        }

        document.querySelector(".stockSymbol").style.color = "#FFFFFF";

        for (i = 0; i < currentPrice.length; i++) {
          currentPrice[i].style.color = "#FFFFFF";
          currentPrice[0].style.textShadow = "2px 4px 2px #42494E";
          currentPrice[1].style.textShadow = "2px 8px 2px #42494E";
          currentPrice[2].style.textShadow = "2px 4px 2px #42494E";
        }
  }

  console.log("time checked at " + timeNY);
}, 60000);
