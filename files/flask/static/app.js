// variables
key = 'pk.eyJ1IjoiaGFnaW44MSIsImEiOiJjamhkYnI3OXMwOXhvM2NtbGRreWdpYnNlIn0.xa19EIY7LAkFsF8cmWm3lA';
county_geojson = 'https://data.texas.gov/resource/abaj-inw3.geojson';

var map, county, rate, income, SAT;

// format income as currency 
function format_currency(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

// function to render map 
function render_choropleth( option ) {

// get data from API
d3.json("/data", function (response) {
  // looping to get county rates and income from response json
  // console.log(response);
  for (var i in response) {

    data = response[i];

    // for (var a in data) {

      county = data['County'];
      rate = data['Graduation'];
      income = data['Income'];
      SAT = data['SAT']
      // console.log( income );
    // }
  }


  txdata.features.forEach(item => {
    const county = item.properties.COUNTY;
    const matched = response.filter(stuData => {
      return county.toLowerCase().indexOf(stuData.County.toLowerCase()) > -1
    })

    // like append for objects
    item.properties = Object.assign(item.properties, matched[0])

  //   // convert to int 
  //  if(item.properties.Income) {
  //   item.properties.Income = +item.properties.Income.replace(/(\$|,)/g, "")
  //  }

    return item

  })

  // console.log(txdata)
  // initialize map
  map = L.map('map').setView([31.968599, -99.901813], 6);

  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + key, {
    id: 'mapbox.light',
    attribution: '',
  }).addTo(map);
  // console.log(txdata)
  L.geoJson(txdata).addTo(map);

  // Creating a new choropleth layer
  geojson = L.choropleth(txdata, {
    // Which property in the features to use
    valueProperty: option,
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
    onEachFeature: function (feature, layer) {
      layer.bindTooltip("County: " + feature.properties.County + 
      "<br>Graduation Rate(%): " + feature.properties.Graduation + 
      "<br>Average Household Income: " + format_currency( parseFloat(feature.properties.Income), "$" ) +
      "<br>Average SAT score: " + feature.properties.SAT
    );
    }
  }).addTo(map);

});
}

// bubbles
function render_bubbles( option ) {

 // re-render map
   map.remove();

// Perform a GET request to the query URL
d3.json( county_geojson , function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><h3>Location: "+ feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      },

      pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
          {radius: 25000 *  feature.properties.mag,
          fillColor: getColor(feature.properties.mag),
          fillOpacity: .6,
          color: "#000",
          stroke: true,
          weight: .8
      })
    }
    });



  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define layers
  var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=" + key );
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=" + key );
  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=" + key );

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Grayscale": grayscale,
    "Outdoors": outdoors,
    "Satellite": satellite

};

// layer for tectonic plates
var plates = new L.LayerGroup();

  // Add tectonic plates data
  d3.json( platesURL, function(tectonicData) {
    L.geoJson(tectonicData, {
        color: "#E39403",
        weight: 2
    })
    .addTo( plates );
});

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Fault Lines": plates
    
};

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      36.77, -109.41
    ],
    zoom: 5,
    layers: [ grayscale, earthquakes, plates ]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // legend
 var legend = L.control({position: 'bottomright'});

 legend.onAdd = function (map) {
 
   var div = L.DomUtil.create('div', 'info legend'),
     grades = [ 0, 1 , 2, 3 , 4, 5 ],
     labels = [],
     from, to;
 
   for (var i = 0; i < grades.length; i++) {
     from = grades[i];
     to = grades[i + 1];
 
     labels.push(
       '<i style="background:' + getColor(from + 1) + '"></i> ' +
       from + (to ? '&ndash;' + to : '+'));
   }
 
   div.innerHTML = labels.join('<br>');
   return div;
 };
 
 legend.addTo(myMap); 
}

  // get color depending on magnitude of earthquake
  function getColor(d) {
    return d > 5 ? '#800026' :
        d > 4  ? '#BD0026' :
        d > 3  ? '#E31A1C' :
        d > 2  ? '#FC4E2A' :
        d > 1  ? '#FD8D3C' :
        d > 0  ? '#FEB24C' :
              '#FFEDA0';
  }

}

jQuery('#choice').change( function() {

   // re-render map
   map.remove();

jQuery('#map').html("");

   // when choice is made from drop down
   var value = jQuery(this).val();
   if ( value == 'ch_income') render_choropleth("Income");
   if ( value == 'ch_grad') render_choropleth("Graduation");
   if ( value == 'ch_sat') render_choropleth("SAT");
})

// default value 
render_choropleth("Income");






