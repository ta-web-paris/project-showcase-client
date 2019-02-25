import $ from "jquery";

$(document).ready(function() {
  var scrollTop = 0;
  $(window).scroll(function() {
    scrollTop = $(window).scrollTop();
    if (scrollTop >= 100) {
      $("#HomeHeader").addClass("scrolled-nav");
      $(".logo").addClass("scrolled-logo");
      $(".big-subtitle").hide();
      $(".big-title").hide();
      $(".menu").hide();
    } else if (scrollTop < 100) {
      $("#HomeHeader").removeClass("scrolled-nav");
      $(".logo").removeClass("scrolled-logo");
      $(".big-subtitle").show();
      $(".big-title").show();
      $(".menu").show();
    }
  });

  // $(".li-content").hover(
  // function() {
  //   $(this)
  //     .find(".hidden-content")
  //     .css("display", "flex");
  //   // .show();
  // },
  // function() {
  //   $(this)
  //     .find(".hidden-content")
  //     .css("display", "none");
  //   // .hide();
  // }
  // );
});
