/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    const form = $(this);
    const text = form.serialize();

    $('.alert-user').slideUp();
    if ($('#tweet-text').val().length <= 1) {
      $('.alert-user').slideDown(750).text('You have not typed anything, don\'t be shy!   😎');
      return;
    }

    if ($('#tweet-text').val().length >= 141) {
      $('.alert-user').slideDown(750).text('You have typed too much! 😵‍💫 cut us some slack please!');
      return;
    }

    $.post('/tweets', text)
      .then(loadTweets);
    const counter = '#tweet-text + div output';
    $("#tweet-text").val("");
    $(counter).text("140");
    console.log('text', text);
  });

  const loadTweets = function() {
    $.get('/tweets')
      .then(renderTweets);

  };

  loadTweets();

});

// function for rendering tweets
const renderTweets = function(tweets) {
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

//for preventing cross-site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//function for creatin tweets
const createTweetElement = (tweet) => {
  const safeHTML = `<p class="tweet-text-log">${escape(tweet.content.text)}</p>`;
  let $tweet = `<article>
  <header class="tweet">
    <div>
      <img src="${tweet.user.avatars}" ></img>
      <p>${tweet.user.name}</p>
    </div>
    <p class ="username">${tweet.user.handle}</p>
    </header>
    ${safeHTML}
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
