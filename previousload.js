//initiate save to localStorage when form is "submitted"
var lastStock = {};

function setSymbol() {
  lastStock.symbol = stock.quote.symbol;
  localStorage.setItem( 'symbol', JSON.stringify(lastStock) );
}

//initiate get from localStorage when windows load if possible
function getSymbol() {
  if (localStorage.symbol != null) {
      search.value = (JSON.parse( localStorage.symbol )).symbol;
  } else {
    //do nothing
  }
}

function setLearned() {
  localStorage.setItem('learn', 1);
}

function getLearned() {
  if (localStorage.learn !== undefined) {
    $('.keyboard').hide();
  } else {
    $('.keyboard').show();
  }
}
