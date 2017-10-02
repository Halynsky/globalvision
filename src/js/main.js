console.log('GlobalVision Start');

$(document).ready(function () {

    var main = {
        attachHeader: function () {
            $(window).scroll(function () {
                if ($(document).scrollTop() >= $('.m-home').height()) {
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
                $('html,body').animate({scrollTop: $('#services').offset().top}, 800);
            });
            $("a[href='#whatweare']").on("click", function (event) {
                event.preventDefault();
                $('html,body').animate({scrollTop: $('#whatweare').offset().top}, 800);
            });
            $("a[href='#contacts']").on("click", function (event) {
                event.preventDefault();
                $('html,body').animate({scrollTop: $('#contacts').offset().top}, 800);
            });
        },
        checkResolution: function() {
            var windowWidth = $(window).width();
            var parent = $("body");

            if(windowWidth <= 600){
                console.log('XS');
                parent.attr('class','');
                parent.addClass('xs');
            }
            if ((windowWidth >= 601) || (windowWidth <= 992)) {
                console.log('SM');
                parent.attr('class','');
                parent.addClass('sm');
            }
            else {
                parent.attr('class','')
            }
        },
        initSlider: function () {
            // $("").swiper({
            //     // item: 1,
            //     // slideMargin: 0,
            //     // loop: true,
            //     // autoWidth: true,
            //     // pager: false
            // });

            var testimonial = new Swiper('.testimonial-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            });

            var service = new Swiper('.service-slider', {
                slidesPerView: 3,
                spaceBetween: 30,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                effect: 'fade'
            });
        },
        technologies: function () {
            var w = $("#technologies").width(),
                h = 800,
                circleWidth = 5;


            var palette = {
                "lightgray": "#D8DBDB",
                "gray": "#708284",
                "mediumgray": "#536870",
                "blue": "#3B757F",
                "violet": "#411997"
            };

            var nodes = [
                {index: 0, name: "Skills", value: 80, bgColor: "#fff", imageUrl: "public/images/team.png"},
                {index: 1, name: "HTML5", target: [0], value: 48, bgColor: "#fff", imageUrl: "public/images/html.svg"},
                {index: 2, name: "CSS3", target: [0, 1], value: 45, bgColor: "#fff", imageUrl: "public/images/css.png"},
                {index: 3, name: "Angular 2", target: [0, 1], value: 42, bgColor: "#fff", imageUrl: "public/images/angular2.svg"},
                {index: 4, name: "jQuery", target: [0, 1], value: 52, bgColor: "#fff", imageUrl: "public/images/jquery.png"},
                {index: 5, name: "JavaScript", target: [0, 1], value: 42, bgColor: "#fff", imageUrl: "public/images/js.png"},
                {index: 6, name: "Git", target: [0], value: 38, bgColor: "#fff", imageUrl: "public/images/git.svg"},
                {index: 7, name: "Gulp", target: [0, 1], value: 45, bgColor: "#fff", imageUrl: "public/images/gulp.svg"},
                {index: 8, name: "AngularJS", target: [0, 1], value: 38, bgColor: "#fff", imageUrl: "public/images/angularjs.svg"},
                {index: 9, name: "MySql", target: [0], value: 30, bgColor: "#fff", imageUrl: "public/images/html.svg"},
                {index: 10, name: "TypeScript", target: [0, 3], value: 39, bgColor: "#fff", imageUrl: "public/images/html.svg"},
                {index: 11, name: "PostgreSQL", target: [0], value: 43, bgColor: "#fff", imageUrl: "public/images/postgresql.png"},
                {index: 12, name: "Npm", target: [0, 1], value: 40, bgColor: "#fff", imageUrl: "public/images/npm.svg"},
                {index: 13, name: "Java", target: [0, 1 , 9 , 11], value: 63, bgColor: "#fff", imageUrl: "public/images/java.png"}
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
                .attr("viewBox", "0 0 1050 820")
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


            // node.append('text')
            //     .text(function (d) {
            //         return d.name;
            //     })
            //     .attr('font-family', 'Muli', 'Helvetica Neue, Helvetica')
            //     .attr('alignment-baseline', 'middle')
            //     .attr('fill', function (d, i) {
            //         if (i > 0 && d.value < 10) {
            //             return palette.mediumgray;
            //         } else if (i > 0 && d.value > 10) {
            //             return palette.violet;
            //         } else {
            //             return palette.blue;
            //         }
            //     })
            //     .attr('text-anchor', function (d, i) {
            //         return 'middle';
            //     })
            //     .attr('font-size', function (d, i) {
            //         var size = nodes[i].value / 2.5;
            //         return size;
            //     });

            node.append("svg:image")
                .attr("xlink:href",   function (d) {
                    return d.imageUrl;
                })
                .attr("width",  function (d,i) {
                    if (i > 0) {
                        return d.value + d.value / 2;
                    }
                    else {
                        return 2*d.value;
                    }
                })
                .attr("height",  function (d,i) {
                    if (i > 0) {
                        return d.value + d.value / 2;
                    }
                    else {
                        return 2*d.value;
                    }
                })
                .attr("x", function (d,i) {
                    if (i > 0) {
                        return - (d.value + d.value / 2) / 2;
                    }
                    else {
                        return -2*d.value /2;
                    }
                })
                .attr("y", function (d,i) {
                    if (i > 0) {
                        return - (d.value + d.value / 2) / 2;
                    }
                    else {
                        return -2*d.value /2;
                    }
                });

            force.start();
        }
    };

    main.attachHeader();
    main.menuScrollToSection();
    main.initSlider();
    main.technologies();
    main.checkResolution();

    $(window).resize(function(){
        main.checkResolution();
    })

});
