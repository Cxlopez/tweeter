/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('.tweet-container').html('');

  for (const tweet of tweets) {
    const tweetVal = createTweetElement(tweet);
    $('.tweet-container').append(tweetVal);
  }
};

const createTweetElement = (tweet) => {
  let $tweet = `<article>
  <header class="tweet">
    <div>
      <img src="${tweet.user.avatars}" ></img>
      <p>${tweet.user.name}</p>
    </div>
    <p class ="username">${tweet.user.handle}</p>
  </header>
  <p class="tweet-message">${tweet.content.text}</p>
  <footer>
    <p class="tweet-date">${timeago.format(tweet.created_at)}</p>
    <div class="react-icons">
      <i class="flag fa-solid fa-flag"></i>
      <i class="retweet fa-solid fa-retweet"></i>
      <i class="heart fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
  return $tweet;
};
$(document).ready(function() {

  $('form').submit(function(event) {
    event.preventDefault();
    const form = $(this);
    const text = form.serialize();

    if (text.length <= 1) {
      $('.alert').slideDown(1000).text("you gotta say something");
      return;
    }


    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: text
    }).then(loadTweets);
    console.log('text', text);
  });

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'JSON',
      
    }).then(renderTweets);
    
  };

  loadTweets();

});