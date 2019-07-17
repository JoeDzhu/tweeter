/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "Don't you dare throw another apple on me"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
//in the console, malicious become &lt;script&gt;$('body').empty()&lt;/script&gt;
};

const createTweetElement = function(tweet) {
  const markup =`
    <article class="tweet">
    <header class="headProfile">
      <img src=${tweet.user.avatars}>
      <a class="namePosition">${escape(tweet.user.name)}</a>            
      <a>${escape(tweet.user.handle)}</a>
    </header>
    <div class="singleTweet">
      <p>${escape(tweet.content.text)}</p>
    </div>
    <footer class="fot">
      <a>${new Date(tweet.created_at).getFullYear()}</a>
    </footer>
    </article>
  `;
  return markup;
};
// moment.fromNow(true) doesn't work?
const renderTweets = function(tweets) {
  for(tweet of tweets) {
    let $template = createTweetElement(tweet);
    $(".tweets").prepend($template);//此处不要用id，id是唯一的，如果是loop的，id重名了，但class就没啥问题；
  }
};

const postTweets = () =>{
  
  const $submitTweets = $(".tweet-submit");

  $submitTweets.submit(function (e){//the submit event is attached to the form not input, how they built it;
    
    e.preventDefault();

    const inputLen = $("textarea").val().length;
    
    if (inputLen === 0 || null) {
      alert("Type something.");
    }
  
    if (inputLen > 140) {
      alert("Stop, too much.");
      stopEvent(e);
    }

    $.ajax({
    url: "http://localhost:8080/tweets", 
    method: "POST",
    data: $(this).serialize()//don't need to get the value to serialize, the value/data is the input;
    })

    loadTweets();
  })
};

const loadTweets = () =>{
  // const $clickSubmit = $("#submitTweet");

  // $clickSubmit.on("click", () =>{
    
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    })
    .then(function (moretweets) {
      renderTweets(moretweets);
    })
  // })
};

const showForm = () =>{
  $("#compose").click(() =>{
    $(".tweet-submit").toggle("slow");
  })
}

$(document).ready(function(){
  postTweets();
  loadTweets();
  showForm();//always use document.ready to load any js funcs;
});
