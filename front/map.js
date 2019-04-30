
var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2862723, lng: -97.7387818},
    zoom: 8
});
}

function addMarker(feature) {
  var iconoMarca = "pulsating_animation.gif";     
  var marker = new google.maps.Marker({
    position: feature.position,
    icon: iconoMarca,
    map: map
  });
  
}

function updatePosition(lat, long) {
    // actually update the marker
    var myLatLng = {lat: lat, lng: long};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 20,
          center: myLatLng
        });
        
    
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Backpack is Here!'
        

        });
}

function getPosition() {
    $.getJSON(gpsUrl, function(data, status) {
      console.log(data)
      updatePosition(data["lat"], data["long"])
    })
    // old hard coded stuff
//    console.log("button")
//    lat = 30.2862723
//    long= -97.7387818
//    updatePosition(lat, long)
}

gpsUrl = "http://s19-iot.appspot.com/gps"