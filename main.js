

//Initializing the map
function setMap() {
  console.log("Loading map");

  var map = L.map("map").setView([63.433, 10.395], 14 );
  //Set view takes two parameters;
  //1. The coordinates for the center of the map
  //2. The zoom level. Zoomlevel is from 0 -> 22, where 22 is zoomed in an 0 is zoomed out

  //Adding the base map. Base map decides how the background map looks like
  var basemapUrl = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF0aGlsZG8iLCJhIjoiY2lrdHZvMHdsMDAxMHdvbTR0MWZkY3FtaCJ9.u4bFYLBtEGNv4Qaa8Uaqzw";
  L.tileLayer(basemapUrl).addTo(map);

  //Adding geoJSON layer to the map:
  L.geoJSON(utesteder, {
    onEachFeature: onEachFeature
  }).addTo(map);

 

  var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Den nærmeste parkeringsplassen er " + findNearest(e).toString())
        .openOn(map);
}

function findNearest(e) {
  var coord, lat, lng, string, strings, dis, name;

  string = utesteder.features[0].geometry.coordinates.toString();
  strings = string.split(",");
  lat = strings[1];
  lng = strings[0];
  coord = L.latLng([lat, lng]);

  dis = e.latlng.distanceTo(coord);
  name = utesteder.features[0].properties.name;

  for (var i = 1; i< utesteder.features.length;i++) {
    string = utesteder.features[i].geometry.coordinates.toString();
    strings = string.split(",");
    lat = strings[1];
    lng = strings[0];
    coord = L.latLng([lat, lng]);
    if (dis > e.latlng.distanceTo(coord)){
      dis = e.latlng.distanceTo(coord);
      name = utesteder.features[i].properties.name;
   }
}
  return name;
}

map.on('click', onMapClick);

}


function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup("<h4>" + feature.properties.name + "</h4> <p> " + feature.properties.desc + "</p> <img class='test' src =" + feature.properties.image +  "> </img>");
  };

}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;

   var circle = L.circle([position.coords.latitude, position.coords.longitude], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 30
    }).bindPopup("Den nærmeste parkeringsplassen er " + findNearest(L.latLng([position.coords.latitude, position.coords.longitude])).toString()).openPopup().addTo(map);

}






window.onload = setMap;
