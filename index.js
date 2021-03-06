var map,
  infoWindow,
  request,
  service,
  markers = [],
  query = ['bars']; //set a default query so things don't get overloaded as the user clicks a bunch on the map

  $(function() {
      $('[data-action=submit-search]').on('click', function() {
        query = [document.querySelector('[data-element="place-search"]').value];
        initialize();
      });

      $('[data-element=place-search]').on('keydown', function(event){
          if(event.keyCode == 13){
               $('[data-action=submit-search]').trigger('click');
          }
      });
    });

function initialize() {
  var center = new google.maps.LatLng(37.422, -122.084058);

    map = new google.maps.Map(document.querySelector('[data-region="map"]'), {

    center  : center,
    zoom    : 10
  });

  request = {
    location    : center,
    radius      : 80467.2, //50 miles
    name        : query
  };

  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, PushMarkerArray);

  google.maps.event.addListener(map, 'click', function(event) {
    map.setCenter(event.latLng)
    clearResults(markers)
    request = {
      location  : event.latLng,
      radius    : 80467.2, //50 miles
      name      : query
    };

    service.nearbySearch(request, PushMarkerArray);
  })
}

function PushMarkerArray(results, status) {
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      markers.push(createMarker(results[i]));
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map     : map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent('<div class="u-lineHeight--default">' + place.name + '<br>' + place.vicinity + '<br>' + '<span class="u-text--capitalize">' + place.types[0] + '</span>' + '</div>');
    infoWindow.open(map, this);
  });

  return marker;
}

function clearResults(markers) {
  markers = []
}

google.maps.event.addDomListener(window, 'load', initialize);
