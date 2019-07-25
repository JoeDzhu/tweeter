/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const markup = `
    <article class="tweet">
    <header class="headProfile">
      <div>
        <img src=${tweet.user.avatars}>
        <a>${escape(tweet.user.name)}</a>
      </div>            
      <div>${escape(tweet.user.handle)}</div>
    </header>
    <div class="singleTweet">
      <p>${escape(tweet.content.text)}</p>
    </div>
    <footer class="fot">
      <a>${moment(tweet.created_at).fromNow()}</a>
      <div>
      <img src="images/icons8-empty-flag-24.png">
      <img src="images/icons8-facebook-like-24.png">
      <img src="images/icons8-retweet-24.png">
      </div>
    </footer>
    </article>
  `;
  return markup;
};

const renderTweets = function(tweets) {
  const $tweetAtweet = $(".tweets");
  for (tweet of tweets) {
    let $template = createTweetElement(tweet);
    $tweetAtweet.prepend($template);
  }
};

const postTweets = () => {
  const $submitTweets = $("#tweet-submit");

  $submitTweets.submit(function(e) {
    e.preventDefault();

    const inputLen = $("textarea").val().length;

    if (inputLen === 0 || null) {
      alert("Type something.");
    } else if (inputLen > 140) {
      $(".stop-typing").slideDown();
    } else {
      $(".stop-typing").slideUp();

      $.ajax({
        url: "http://localhost:8080/tweets",
        method: "POST",
        data: $(this).serialize()
      }).then(loadTweets);
      $("textarea").val("");
      $(".counter").text(140);
    }
  });
};

const loadTweets = () => {
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "GET"
  }).then(function(moretweets) {
    renderTweets(moretweets.slice(2));
  });
};

const showForm = () => {
  $("#compose").click(() => {
    $("#tweet-submit").toggle("slow");
    $("#tweet-textarea").focus();
  });
};

$(document).ready(function() {
  postTweets();
  loadTweets();
  showForm();
});
