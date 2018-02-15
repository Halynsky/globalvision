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

        var titles = $('.title-animate');
        var windowHeight = window.innerHeight;
        for (var i = 0; i < titles.length; i++) {
          titles[i].boundaries = titles[i].getBoundingClientRect();
          if ((titles[i].boundaries.top > 64) && ((titles[i].boundaries.top < windowHeight - 64))) {

            if (titles[i].classList.contains('animate')) {
              titles[i].classList.remove('animate');
              titles[i].classList.add('animate');
            }
            else {
              titles[i].classList.add('animate');
            }
          }

          else {
            titles[i].classList.remove('animate');
          }
        }
      });

    },
    menuScrollToSection: function () {

      $("a[href='#about']").on("click", function (event) {
        event.preventDefault();

        $('html,body').animate({scrollTop: $('#about').position().top - 62}, 800);
      });
      $("a[href='#services']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#services').position().top - 62}, 800);
      });
      $("a[href='#work-process']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#work-process').position().top - 62}, 800);
      });
      $("a[href='#benefits']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#benefits').position().top - 62}, 800);
      });
      $("a[href='#portfolio']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#portfolio').position().top - 62}, 800);
      });
      $("a[href='#contacts']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#contacts').position().top - 62}, 800);
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
      var navigation = $("#navigation");

      $(".hamburger").on('click', function () {
        console.log("Click-click");
        $(this).toggleClass("is-active");
        navigation.toggleClass("active-menu");

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

      navigation.find('a').on('click', function (e) {
        console.log('Knock');
        e.preventDefault();
        $(".hamburger").removeClass('is-active');
        $(".header").removeClass('active');
        navigation.removeClass("active-menu");
        $("body").css('overflow', 'auto');
      });

    },
    initSlider: function () {

      var testimonial = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'fade',
        loop: true,
        autoplay: 7000,
        speed: 2000,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1,
        paginationClickable: true,
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
    },
    processInit: function () {

      $(window).scroll(function () {
        var process = $('#work-process');
        // console.log($('#work-process').position().top);
        var isAnimate = true;
        if (isAnimate && ($(window).scrollTop() > $('#work-process').position().top - 600 && $(window).scrollTop() < $('#work-process').position().top + $('#work-process').height())) {
          process.addClass('active');

        } else {
          process.removeClass('active');
        }
      });

    },
    wowInit: function () {
      new WOW({
        offset: 100,
        mobile: true,
        live: true
      }).init();
    },
    mySlider: function () {
      var slider = $('.my-slider');
      var slidesCoord;
      var slides = $('.slide');
      var slideActive = slider.find('.active');

      if ($(document).width() > 992) {
        var slidesPos = generateArrayPosition();

        console.log(slidesPos);
        slidesCoord = randomizer(slidesPos);
      }

      slides.each(function (index) {
        var randomNum = Math.random() * (0.75 - 0.25) + 0.25;
        var randScale = randomNum + 0.2;
        $(this).css({"transform":"translate(" + slidesCoord[index].x * 100 + "%," + slidesCoord[index].y * 100 + "%) scale(" + randScale + ")",'opacity': randomNum,'z-index': randomNum});
      });

      slides.click(function (event) {
        $('.slide.active').attr('data-slide', $(this).attr('data-slide')).css('transform', $(this).css('transform'));
        $('.slide').removeClass('active').css({'z-index': 5, 'opacity': 0.5});
        $(this).addClass('active');
        $(this).attr('data-slide', 0);
        $(this).css({'z-index': 10, 'opacity': 1});
      });

      function generateArrayPosition() {
        var arrayLength = slides.length;
        var numberArray = [];
        var i = 0;
        while (i < arrayLength) {
          if (i === 0) {
            numberArray.push(1);
            i++;
          }
          else {

            var randomNumber = Math.ceil(Math.random() * 5);

            if (!numberArray.includes(randomNumber)) {
              numberArray.push(randomNumber);
              i++;
            }
          }
        }

        return numberArray;
      }

      function randomizer(value) {
        var res = [];

        // console.log(value);

        for (var j = 0; j < value.length; j++) {
          var result = (Math.random() * (0.75 - 0.25) + 0.25).toFixed(2);
          if (result <= 0.75) {
            result = 0.75;
          }
          // console.log(result);


          switch (value[j]) {
            case 1: {
              res.push({x: 0, y: 0});
            }
              break;
            case 2: {
              res.push({x: parseFloat(result), y: parseFloat(result)});
            }
              break;
            case 3: {
              res.push({x: -parseFloat(result), y: -parseFloat(result)});
            }
              break;
            case 4: {
              res.push({x: parseFloat(result), y: -parseFloat(result)});
            }
              break;
            case 5: {
              res.push({x: -parseFloat(result), y: parseFloat(result)});
            }
              break;
          }
        }

        // console.log(res);
        return res;
      }

      // console.log(slides);
    }
  };

  main.attachHeader();
  main.menuScrollToSection();
  main.initSlider();
  main.sendMail();
  main.toggleMenu();
  main.processInit();
  main.wowInit();
  main.mySlider();

  $(window).resize(function () {
    main.wowInit();
  });
});
