// Creating map object
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=" +
  "pk.eyJ1IjoiaGFnaW44MSIsImEiOiJjamhkYnI3OXMwOXhvM2NtbGRreWdpYnNlIn0.xa19EIY7LAkFsF8cmWm3lA").addTo(myMap);

// link to flask API to get income data
function getData( url, county ) {

  d3.json( url, function(data ) {

     

  })
}


// Link to GeoJSON
var APILink = "https://raw.githubusercontent.com/TNRIS/tx.geojson/master/counties/tx_counties.geojson";

var geojson;

// Grabbing data with d3...
d3.json(APILink, function(data) {

  // Creating a new choropleth layer
  geojson = L.choropleth(data, {
    // Which property in the features to use
    valueProperty: "MHI",
    // Color scale
    scale: ["#ffffb2", "#b10026"],
    // Number of breaks in step range
    steps: 10,
    // q for quantile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.COUNTY + " " + feature.properties.State + "<br>Median Household Income:<br>" +
        "$" + feature.properties.MHI);
    }
  }).addTo(myMap);

  // Setting up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});