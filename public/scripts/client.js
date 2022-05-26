/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
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
    <p class="tweet-date">${tweet.created_at}</p>
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
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: text
    });
    console.log('text', text);
  });


  renderTweets(data);

});