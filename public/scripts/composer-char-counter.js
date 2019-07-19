$(document).ready(function(){


  $("textarea").on("input", function() {
    const str = $(this).val().length;
    $(".counter").text(140 - str);


    if(str > 140) {


      $(".counter").addClass("error");

    }else {

      $(".counter").removeClass("error");
    }
  })
});
