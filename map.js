
var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2862723, lng: -97.7387818},
    zoom: 8
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
          title: 'Tracker is Here!'
        });
}

function getPosition() {
    // TODO: connect to the arduino/ get the actual position
    console.log("button")
    lat = 30.2862723
    long= -97.7387818
    updatePosition(lat, long)
}


