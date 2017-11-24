(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 57)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  var active = $('.active'),
  firstTab = $('.tab:nth-child(1)'),
  secondTab = $('.tab:nth-child(2)'),
  thirdTab = $('.tab:nth-child(3)'),
  yellowBg= $('.yellow'),
  blueBg = $('.blue'),
  snap = $('.snap'),
  sort = $('.sort');


firstTab.on('click',function(){
  console.log("Clicked");
  active.animate({
    left:'20%'
  });
  secondTab.animate({
    marginTop:'50px'
  });
  yellowBg.animate({
    right:'-100%'
  });
  blueBg.animate({
    left:'0'
  });
  $('.camera').animate({
    left:'17%'
  });
  snap.animate({
    padding:'0 40px 0 40px'
  });
  sort.animate({
    marginLeft:'20px'
  });
});

secondTab.on('click',function(){
  active.animate({
    left:'50%'
  });
  $(this).animate({
    marginTop:'0'
  });
  $('.camera').animate({
    left:'25%'
  });
  yellowBg.animate({
    right:'-100%'
  });
  blueBg.animate({
    left:'-100%'
  });
  snap.animate({
    padding:'0'
  });
  sort.animate({
    marginLeft:'0'
  });
});
thirdTab.on('click',function(){
  active.animate({
    left:'80%'
  });
  secondTab.animate({
    marginTop:'50px'
  });
  $('.camera').animate({
    left:'17%'
  });
  yellowBg.animate({
    right:'0'
  });
  blueBg.animate({
    left:'-100%'
  });
  snap.animate({
    padding:'0 40px 0 40px'
  });
  sort.animate({
    marginLeft:'20px'
  });
});




$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });



})(jQuery); // End of use strict

