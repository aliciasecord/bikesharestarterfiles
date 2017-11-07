// make map
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpY2lhc2Vjb3JkIiwiYSI6ImNqOTY4ZG5kdjAxcXkzM282NG4wbmZibGQifQ.8pihI3EzBLwngeG2k6T26g';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  zoom: 12,
  center: [-73.97335052490234, 40.772221877329024]
  });


// get citibike info
let url = 'https://cdn.rawgit.com/mikefresh/cccb2b7571f6de2a4fd96c6271a1b8a3/raw/7b716366fc8fe27b9ecace1bbdcd4cf8d82980fd/citi.json';
axios(url)
  .then(response => {getStations(response.data)});

// set up geojson framework
let geojson = {features: []}

function getStations(data){
  let stations = data.stationBeanList;
  for (station of stations){
    geojson.features.push({geometry: {coordinates: [station.longitude, station.latitude]}});
  }


  // create markers
  geojson.features.forEach(function(marker) {
    // create a HTML element for each feature
    var el = document.createElement('div');

    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  });

}
