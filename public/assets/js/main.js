console.log('GlobalVision Start');

$(document).ready(function () {

    var main = {
        attachHeader: function () {
            $(window).scroll(function () {
                if ($(document).scrollTop() >= $('.m-home').height()) {
                    $('.m-header').addClass('fixed-header');
                    console.log('add class');

                } else {
                    $('.m-header').removeClass('fixed-header');
                    console.log('remove class');
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
        }
    };

    main.attachHeader();
    main.menuScrollToSection();

});

// setInterval(function () {
//     window.location.reload();
// }, 5000);

function initMap() {
    var myLatLng = {lat: 48.9389463, lng: 24.7399861};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 15
    });

    var image = "/assets/images/logo-map.png";

    var marker = new google.maps.Marker({
        map: map,
        position: {lat: 48.9389463, lng: 24.7399861},
        title: "Галицька 67",
        icon: image
    });
}