$('.close-btn').on('click', function (e) {
  e.preventDefault();
  $('.keyboard').fadeOut(200);
  setLearned();
});
