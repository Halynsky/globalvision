function initMap() {
  var mapPosition = {lat: 48.9389463, lng: 24.7499861};
  var markerPosition = {lat: 48.9389463, lng: 24.7399861};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: mapPosition,
    scrollwheel: false,
    zoom: 15
  });

  var contentString = '<div id="content">'+
    '<div class="popup-contacts-body"><div class="popup-contacts-icon"><i class="material-icons">email</i></div> <div class="popup-contacts-text">kub.lorenza@hotmail.com</div></div>'+
    '<div class="popup-contacts-body"><div class="popup-contacts-icon"><i class="material-icons">local_phone</i></div> <div class="popup-contacts-text">(801) 732-1415</div></div>'+
    '<div class="popup-contacts-body"><div class="popup-contacts-icon"><i class="material-icons" class="popup-contacts-icon">location_on</i></div> <div class="popup-contacts-text">560 Jeremy Place Suite 828,<br> North Herman, NM 76349-1429</div></div>'+
    '<div class="arrow"></div></div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    position: markerPosition,
    maxWidth: 230
  });

  // var marker = new google.maps.Marker({
  //   position: markerPosition,
  //   map: map,
  //   icon: ''
  // });

  infowindow.open(map);

  google.maps.event.addListener(infowindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
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
  });
}
