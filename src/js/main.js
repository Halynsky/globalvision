console.log('GlobalVision Start');

$(document).ready(function () {

  var main = {
    attachHeader: function () {

      $(window).scroll(function () {

        if ($(window).scrollTop() > $('.m-home').height()) {
          $('.m-header').addClass('fixed-header');

        } else {
          $('.m-header').attr('style','top: ' + $('.m-home').height());
          $('.m-header').removeClass('fixed-header');
        }
      });

    },
    menuScrollToSection: function () {

      $("a[href='#about']").on("click", function (event) {
        event.preventDefault();

        $('html,body').animate({scrollTop: $('#about').position().top}, 800);
      });
      $("a[href='#services']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#services').position().top - 75}, 800);
      });
      $("a[href='#whatweare']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#what-we-are').position().top - 75}, 800);
      });
      $("a[href='#contacts']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#contacts').position().top - 75}, 800);
      });

    },
    checkResolution: function () {
      var windowWidth = $(window).width();
      var parent = $("body");


      if (windowWidth <= 992) {
        if (windowWidth <= 768) {
          console.log('XS');
          parent.attr('class', '');
          parent.addClass('xs');

        }
        else {
          console.log('SM');
          parent.attr('class', '');
          parent.addClass('sm');
        }
      }
      else {
        parent.attr('class', '')
      }
    },
    initSlider: function () {

      var testimonial = new Swiper('.testimonial-slider .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1080: {
            speed: 1200,
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20
          },
          992: {
            speed: 900,
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20
          },
          768: {
            speed: 600,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0
          }
        }
      });

      var service = new Swiper('.m-services__cards .swiper-container', {
        speed: 1500,
        slidesPerView: 3,
        spaceBetween: 26,
        scrollbarHide: true,
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1080: {
            speed: 1200,
            slidesPerView: 3,
            spaceBetween: 20
          },
          992: {
            speed: 900,
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            speed: 600,
            slidesPerView: 1,
            spaceBetween: 20
          }
        }
      });
    },
    particlesJs: function () {
      var config = {
        "particles": {
          "number": {
            "value": 70,
            "density": {
              "enable": true,
              "value_area": 300
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#ffffff"
            },
            "polygon": {
              "nb_sides": 0
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 2,
              "opacity_min": 0.2,
              "sync": false
            }
          },
          "size": {
            "value": 1.5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#4c70c8",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 200,
              "line_linked": {
                "opacity": 0.7
              }
            },
            "bubble": {
              "distance": 227,
              "size": 40,
              "duration": 2,
              "opacity": 0.5,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 1
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      };
      var canvasParticles = $('#particles-js');
      var width = canvasParticles.width();
      var height = canvasParticles.height();
      var ratio = width / height;
      var starCount = Math.ceil(50 * ratio);
      if (starCount >= 50) {
        starCount = 50;
      }

      if (starCount <= 30) {
        starCount = 30;
      }
      config.particles.number.value = starCount;

      console.log('Particles ->' + config.particles.number.value);
      particlesJS("particles-js", config);
    },
    btnEffect: function () {
        $('.m-btn')
          .on('mouseenter', function(e) {
            console.log('Gotcha');
            var parentOffset = $(this).offset(),
              relX = e.pageX - parentOffset.left,
              relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top:relY, left:relX})
          })
          .on('mouseout', function(e) {
            var parentOffset = $(this).offset(),
              relX = e.pageX - parentOffset.left,
              relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top:relY, left:relX})
          });
        $('[href=""]').click(function(){return false});
    },
    wowInit: function () {

    }
  };

  main.attachHeader();
  main.menuScrollToSection();
  main.initSlider();
  main.btnEffect();
  main.checkResolution();
  main.particlesJs();
  new WOW({
    offset: 100,
    mobile: true,
    live: true
  }).init();

  $(window).resize(function () {
    main.checkResolution();
    main.particlesJs();
  });

});
