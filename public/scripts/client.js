/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $('form').on('submit', function (event) {
    event.preventDefault();
    const form = $(this);
    const text = form.serialize();

    if ($('#tweet-text').val().length <= 1) {
      return alert('You havent typed anything >:|');
    }

    if ($('#tweet-text').val().length >= 141) {
      return alert('You have exceded character limit');
    }

    $.post('/tweets', text)
      .then(loadTweets);
    console.log('text', text);
  });

  const loadTweets = function () {
    $.get('/tweets')
      .then(renderTweets);

  };

  loadTweets();

});

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const container = $('.tweet-container');
  container.empty();

  for (const tweet of tweets) {
    const tweetVal = createTweetElement(tweet);
    container.prepend(tweetVal);
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
