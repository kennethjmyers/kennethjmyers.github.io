window.onload = function() {
  //This is for offsetting the window change by the navbar
  $("#link1").click(function() {
    $('html, body').animate({
        scrollTop: $("#about-section").offset().top -90
    }, 300);
  });
  $("#link2").click(function() {
    $('html, body').animate({
        scrollTop: $("#portfolio-section").offset().top -90
    }, 300);
  });
  $("#link3").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact-section").offset().top -90
    }, 300);
  });
  
  $('body').scrollspy({
    offset: 70,
    target: '#banner'
    
  });
  

};