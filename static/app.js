// variables
key = 'pk.eyJ1IjoiaGFnaW44MSIsImEiOiJjamhkYnI3OXMwOXhvM2NtbGRreWdpYnNlIn0.xa19EIY7LAkFsF8cmWm3lA';
// county_geojson = 'https://data.texas.gov/resource/abaj-inw3.geojson';

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


// loads form geojson
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

    // enables hover effect with display values on map
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

// drop menu
jQuery('#choice').change( function() {

   // re-render map
   map.remove();
   

   // when choice is made from drop down
   var value = jQuery(this).val();
   if ( value == 'ch_income') render_choropleth("Income");
   if ( value == 'ch_grad') render_choropleth("Graduation");
   if ( value == 'ch_sat') render_choropleth("SAT");
})

// default value 
render_choropleth("Income");






