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

        //Title animation

        var titles = $('.title-nimate');
        // var windowHeight = window.innerHeight;
        console.log(titles);
        //
        // for(var i=0;i < titles.length;i++) {
        //   titles[i].getBoundingClientRect();
        //   console.log(titles[i].getBoundingClientRect());
        //
        //   if ($(window).scrollTop() > titles[i].offsetTop - 300) {
        //
        //     titles[i].className += " animate";
        //   }
        // }
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
  // main.wowInit();

  $(window).resize(function () {
    // main.wowInit();
  });
});
