// variables
key = 'pk.eyJ1IjoiaGFnaW44MSIsImEiOiJjamhkYnI3OXMwOXhvM2NtbGRreWdpYnNlIn0.xa19EIY7LAkFsF8cmWm3lA';
var gradData = [];
var county, rate, income, SAT;

// get data from API
d3.json("/data", function (response) {
  // looping to get county rates and income from response json
  console.log(response);
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
  var map = L.map('map').setView([31.968599, -99.901813], 6);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + key, {
    id: 'mapbox.light',
    attribution: '',
  }).addTo(map);
  console.log(txdata)
  L.geoJson(txdata).addTo(map);

  // Creating a new choropleth layer
  geojson = L.choropleth(txdata, {
    // Which property in the features to use
    valueProperty: "Graduation",
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
      layer.bindPopup("County: " + feature.properties.County + 
      "<br>Graduation Rate(%): " + feature.properties.Graduation + 
      "<br>Average Household Income: " + feature.properties.Income +
      "<br>Average SAT score: " + feature.properties.SAT
    );
    }
  }).addTo(map);

});





