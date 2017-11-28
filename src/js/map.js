function initMap() {
  var mapPosition = {lat: 40.7584878, lng: -73.933738};
  var markerPosition = {lat: 40.7594578, lng: -73.9742032};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: mapPosition,
    scrollwheel: false,
    zoom: 13
  });

  var contentString = '<div id="content">'+
    '<div class="popup-contacts-body"><div class="popup-contacts-icon"><i class="material-icons">email</i></div> <div class="popup-contacts-text">ceo@codevision.com.ua</div></div>'+
    '<div class="popup-contacts-body"><div class="popup-contacts-icon"><i class="material-icons">local_phone</i></div> <div class="popup-contacts-text">212-390-0323</div></div>'+
    '<div class="popup-contacts-body"><div class="popup-contacts-icon"><i class="material-icons" class="popup-contacts-icon">location_on</i></div> <div class="popup-contacts-text">509 Madison Ave, 2004<br>New York, NY 10022</div></div>'+
    '<div class="arrow"></div></div>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position: markerPosition,
    maxWidth: 230
  });

  console.log('Debugging:',map);
  google.maps.event.addDomListener(window, 'load', function() {
    infoWindow.close();
    infoWindow.open(map);
    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    iwOuter.addClass("wow bounceInDown");

    if ($(document).width() <= 768) {
      map.panBy(-iwOuter.width(), -iwOuter.height());
    }
    else {
      map.panBy(0, -iwOuter.height());
    }

    var iwBackground = iwOuter.prev();
    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the shadow of the arrow 76px to the left margin.
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Moves the arrow 76px to the left margin.
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important; height: 10px'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({'display' : 'none'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      infoWindow.setPosition(markerPosition);
    });
  });
}
