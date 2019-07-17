$(document).ready(function(){
  // console.log("ready");ready的功效是等整个页面load结束后跑下面的codes；

  $("textarea").on("input", function() {
    const str = $(this).val().length;
    $(".counter").text(140 - str);

    // console.log($("textarea").val());
    //此处是一整个element，并不是一个数值；

    if(str > 140) {

      // console.log($(".counter").css("color"))

      $(".counter").addClass("error");

    }else {

      $(".counter").removeClass("error");
    }
  })
});



// let x = document.getElementsByTagName("textarea");
// console.log(`x + .counter`);