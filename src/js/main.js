console.log('GlobalVision Start');

$(document).ready(function () {

  var main = {
    attachHeader: function () {

      $(window).scroll(function () {
        var header = $('.m-header'),
          home = $('.m-home');

        if ($(window).scrollTop() > home.height() / 2 - 200) {
          header.addClass('fixed-header');

        } else {
          // header.css('top',home.height());
          header.removeClass('fixed-header');
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
    sendMail: function () {

      var contactForm = $("#contactsForm");

      contactForm.validate(
        {
          rules:
            {
              name:
                {
                  required: true,
                  maxlength: 50
                },
              email:
                {
                  required: true,
                  email: true,
                  maxlength: 60
                },
              message:
                {
                  required: true,
                  rangelength: [50, 500]
                }
            },
          errorPlacement: function (error, element) {
            element.addClass("error");
          }
        });

      contactForm.on('submit', function (e) {
        e.preventDefault();

        if (contactForm.valid()) {
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: $(this).serialize()
          }).done(function (data) {

            $(".panel").addClass('flip');

            setTimeout(function () {
              $(".panel").removeClass('flip');
            }, 4000);
          }).fail(function (jqXHR, textStatus) {

            console.log(textStatus);

          })
        }

      });
    },
    toggleMenu: function () {
      $(".hamburger").on('click', function () {
        console.log("Click-click");
        $(this).toggleClass("is-active");
        $("#navigation").toggleClass("active-menu");

        if ($(this).hasClass("is-active")) {

          $(".m-header").addClass('active');
          $(this).parents(".m-header").siblings('.dark-overlay').css('display', 'block');
          $("body").css('overflow', 'hidden');

        } else {

          $(".m-header").removeClass('active');
          $(this).parents(".m-header").siblings('.dark-overlay').css('display', 'none');
          $("body").css('overflow', 'auto');

        }
      });

      $("#navigation a").on('click', function (e) {
        console.log('Knock');
        e.preventDefault();
        $(".hamburger").removeClass('is-active');
        $(".header").removeClass('active');
        $("#navigation").removeClass("active-menu");
        $(".dark-overlay").css('display', 'none');
        $("body").css('overflow', 'auto');
      });

    },
    moveToMouse: function () {
      var button = $('.m-btn');
      button.on('mousemove', function (e) {
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;
        $(this).find('.animate-circle').css({'left': mouseX + 'px', 'top': mouseY + 'px'});
      });

      button.on('mouseleave', function () {
        $(this).find('.animate-circle').css({'left': '-40px', 'top': '-40px'});
      });

    },
    initSlider: function () {

      var testimonial = new Swiper('.testimonial-slider .swiper-container', {
        speed: 1500,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1080: {
            speed: 900,
            slidesPerView: 1,
            spaceBetween: 20
          },
          767: {
            speed: 600,
            slidesPerView: 1,
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
            speed: 900,
            slidesPerView: 2,
            spaceBetween: 20
          },
          767: {
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
    wowInit: function () {
      new WOW({
        offset: 100,
        mobile: true,
        live: true
      }).init();
    }
  };

  main.attachHeader();
  main.menuScrollToSection();
  main.initSlider();
  main.sendMail();
  main.moveToMouse();
  main.toggleMenu();
  main.particlesJs();
  main.wowInit();

  $(window).resize(function () {
    main.particlesJs();
    main.wowInit();
  });
});
