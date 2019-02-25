import $ from "jquery";

$(document).ready(function() {
  console.log("Scrolling!");
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
});
