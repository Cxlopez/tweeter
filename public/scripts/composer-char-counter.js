/* eslint-disable no-undef */
$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    const maxChar = 140;
    const typedChars = $(this).val();
    const charsLeft = maxChar - typedChars.length;
    $('.counter').text(charsLeft);
    if (charsLeft < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});