// make map
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpY2lhc2Vjb3JkIiwiYSI6ImNqOTY4ZG5kdjAxcXkzM282NG4wbmZibGQifQ.8pihI3EzBLwngeG2k6T26g';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  zoom: 11,
  center: [-74, 40.735]
  });


// get citibike info
let url = 'https://cdn.rawgit.com/mikefresh/cccb2b7571f6de2a4fd96c6271a1b8a3/raw/7b716366fc8fe27b9ecace1bbdcd4cf8d82980fd/citi.json';
axios(url)
  .then(response => {getStations(response.data)})
  .catch();

// set up geojson framework
let geojson = {features: []}

function getStations(data){
  let stations = data.stationBeanList;
  for (station of stations){
    if (station.availableBikes > 10 ){
      geojson.features.push(
        {geometry:
         {coordinates: [station.longitude, station.latitude]},
         marker: 'green'
        }
      )}
    if (station.availableBikes > 2 && station.availableBikes < 10){
      geojson.features.push(
        {geometry:
         {coordinates: [station.longitude, station.latitude]},
         marker: 'yellow'
        }
      )}
    else {
      geojson.features.push(
        {geometry:
         {coordinates: [station.longitude, station.latitude]},
         marker: 'red'
        }
      )}
  }

// create markers
geojson.features.forEach(function(marker) {
  // create a HTML element for each feature
  let el = document.createElement('div');
  for (let i=0; i<geojson.features.length; i++){
    if (geojson.features[i].marker == 'green'){
      el.className = 'markerGreen';
    }
    if (geojson.features[i].marker == 'yellow'){
      el.className = 'markerYellow';
    }
    if (geojson.features[i].marker == 'red'){
      el.className = 'markerRed';
  }}

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
  });

}
