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
