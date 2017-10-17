console.log('GlobalVision Start');

$(document).ready(function () {

  var main = {
    attachHeader: function () {

      $(window).scroll(function () {
        if ($(document).scrollTop() >= $('#about').offset().top) {
          $('.m-header').addClass('fixed-header');

        } else {
          $('.m-header').removeClass('fixed-header');
        }
      });

    },
    menuScrollToSection: function () {

      $("a[href='#about']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#about').offset().top}, 800);
      });
      $("a[href='#services']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#services').offset().top - 75}, 800);
      });
      $("a[href='#whatweare']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#whatweare').offset().top - 75}, 800);
      });
      $("a[href='#contacts']").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $('#contacts').offset().top - 75}, 800);
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

      var testimonial = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      });

      var service = new Swiper('.service-slider', {
        speed: 1500,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 26,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1080: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0
          }
        }
      });
    },
    technologies: function () {
      var w = $(".m-how-we-do .container").width() - $(".m-how-we-do .container .text-information").width(),
        h = 800,
        circleWidth = 0;


      var palette = {
        "lightgray": "#D8DBDB",
        "gray": "#708284",
        "mediumgray": "#536870",
        "blue": "#3B757F",
        "violet": "#411997"
      };

      var nodes = [
        {index: 0, name: "Skills", value: 90, bgColor: "#fff", imageUrl: "public/images/team.png"},
        {index: 1, name: "HTML5", target: [0], value: 58, bgColor: "#fff", imageUrl: "public/images/html.svg"},
        {index: 2, name: "CSS3", target: [0, 1], value: 55, bgColor: "#fff", imageUrl: "public/images/css.png"},
        {
          index: 3,
          name: "Angular 2",
          target: [0, 1],
          value: 52,
          bgColor: "#fff",
          imageUrl: "public/images/angular2.svg"
        },
        {index: 4, name: "jQuery", target: [0, 1], value: 62, bgColor: "#fff", imageUrl: "public/images/jquery.png"},
        {index: 5, name: "JavaScript", target: [0, 1], value: 52, bgColor: "#fff", imageUrl: "public/images/js.png"},
        {index: 6, name: "Git", target: [0], value: 48, bgColor: "#fff", imageUrl: "public/images/git.svg"},
        {index: 7, name: "Gulp", target: [0, 1], value: 55, bgColor: "#fff", imageUrl: "public/images/gulp.svg"},
        {
          index: 8,
          name: "AngularJS",
          target: [0, 1],
          value: 48,
          bgColor: "#fff",
          imageUrl: "public/images/angularjs.svg"
        },
        {index: 9, name: "MySql", target: [0], value: 40, bgColor: "#fff", imageUrl: "public/images/html.svg"},
        {index: 10, name: "TypeScript", target: [0, 3], value: 49, bgColor: "#fff", imageUrl: "public/images/html.svg"},
        {
          index: 11,
          name: "PostgreSQL",
          target: [0],
          value: 53,
          bgColor: "#fff",
          imageUrl: "public/images/postgresql.png"
        },
        {index: 12, name: "Npm", target: [0, 1], value: 50, bgColor: "#fff", imageUrl: "public/images/npm.svg"},
        {index: 13, name: "Java", target: [0, 1, 9, 11], value: 73, bgColor: "#fff", imageUrl: "public/images/java.png"}
      ];

      var links = [];

      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].target !== undefined) {
          for (var x = 0; x < nodes[i].target.length; x++)
            links.push({
              source: nodes[i],
              target: nodes[nodes[i].target[x]]
            });
        }
      }


      var myChart = d3.select('#technologies')
        .append("div")
        .classed("svg-container", true)
        .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 680 820")
        .classed("svg-content-responsive", true);


      var force = d3.layout.force()
        .nodes(nodes)
        .links([])
        .gravity(0.1)
        .charge(-1000)
        .size([w, h]);

      var link = myChart.selectAll('line')
        .data(links).enter().append('line')
        .attr('stroke', palette.lightgray)
        .attr('strokewidth', '1');

      var node = myChart.selectAll('circle')
        .data(nodes).enter()
        .append('g')
        .call(force.drag);


      node.append('circle')
        .attr('cx', function (d) {
          return d.x;
        })
        .attr('cy', function (d) {
          return d.y;
        })
        .attr('r', function (d, i) {

          return circleWidth + d.value;

        })
        .attr('fill', function (d, i) {
          if (i > 0) {
            return nodes[i].bgColor;
          } else {
            return '#fff';
          }
        })
        .attr('stroke-width', function (d, i) {
          if (i > 0) {
            return '0';
          } else {
            return '3';
          }
        })
        .attr('stroke', function (d, i) {
          if (i > 0) {
            return '';
          } else {
            return '#411997';
          }
        });


      force.on('tick', function (e) {
        node.attr('transform', function (d, i) {
          return 'translate(' + d.x + ',' + d.y + ')'
        });

        link
          .attr('x1', function (d) {
            return d.source.x;
          })
          .attr('y1', function (d) {
            return d.source.y;
          })
          .attr('x2', function (d) {
            return d.target.x;
          })
          .attr('y2', function (d) {
            return d.target.y;
          })
      });

      node.append("svg:image")
        .attr("xlink:href", function (d) {
          return d.imageUrl;
        })
        .attr("width", function (d, i) {
          if (i > 0) {
            return d.value + d.value / 2;
          }
          else {
            return 2 * d.value;
          }
        })
        .attr("height", function (d, i) {
          if (i > 0) {
            return d.value + d.value / 2;
          }
          else {
            return 2 * d.value;
          }
        })
        .attr("x", function (d, i) {
          if (i > 0) {
            return -(d.value + d.value / 2) / 2;
          }
          else {
            return -2 * d.value / 2;
          }
        })
        .attr("y", function (d, i) {
          if (i > 0) {
            return -(d.value + d.value / 2) / 2;
          }
          else {
            return -2 * d.value / 2;
          }
        });

      force.start();
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
              "mode": ""
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 300,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "bubble": {
              "distance": 227.77222777222775,
              "size": 40,
              "duration": 2,
              "opacity": 0.5354645354645354,
              "speed": 3
            },
            "repulse": {
              "distance": 567.4325674325675,
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

      config.particles.number.value = Math.ceil(50 * ratio);

      console.log('Particles ->' + config.particles.number.value);
      particlesJS("particles-js", config);
    }
  };

  main.attachHeader();
  main.menuScrollToSection();
  main.initSlider();
  main.technologies();
  main.checkResolution();
  main.particlesJs();

  $(window).resize(function () {
    main.checkResolution();
    main.particlesJs();
  });

});
