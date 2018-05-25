// variables
key = 'pk.eyJ1IjoiaGFnaW44MSIsImEiOiJjamhkYnI3OXMwOXhvM2NtbGRreWdpYnNlIn0.xa19EIY7LAkFsF8cmWm3lA';
var gradData, county, rate, income;

// get data from API
d3.json("/data", function(response) {  

gradData = response;


  function getColor(d) {
    return d > 90000 ? '#800026' :
        d > 80000  ? '#BD0026' :
        d > 70000  ? '#E31A1C' :
        d > 60000  ? '#FC4E2A' :
        d > 50000  ? '#FD8D3C' :
        d > 40000  ? '#FEB24C' :
        d > 30000   ? '#FED976' :
        d > 20000   ? '#D7FE4C' :
              '#FFEDA0';
  }

    function style(feature) {
      //console.log( feature.properties.COUNTY );
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: getColor( gradData[feature.properties.COUNTY.replace(" County","")]['Income'] )
    };
  }

// initialize map
var map = L.map('map').setView([ 31.968599, -99.901813], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + key, {
    id: 'mapbox.light', 
    attribution: '',
}).addTo(map);

//L.geoJson(txdata).addTo(map);
var geojson = L.geoJson(txdata, {  
      style: style,
      onEachFeature: onEachFeature
  }).addTo(map);

    var feature_readable_names = {'zipMean':'OON/Total Visits', 'provider_density':'Provider Density', 'population_density_sqmile':'Population Density / Sq Mile', 'mean_income':'Average Income'};  // this will need to be automated for product version

  function onEachFeature(feature, layer) {  // use onEachFeature option to add event listeners to data layer
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
  }


  function highlightFeature(e) {  // highlight area on mouseover event
      var layer = e.target;

      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }

      info.update(layer.feature.properties);
  }


  function resetHighlight(e) {  // reset style on mouseout event
      geojson.resetStyle(e.target);
      info.update();
  }


  function zoomToFeature(e) {  // zoom to feature on click event
      map.fitBounds(e.target.getBounds());
  }


  // feature information box
 // control that shows state info on hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML = '<h4>Texas Income by County</h4>' +  (props ?
      '<b>' + props.name + '</b><br />' + props.density + '<sup>2</sup>'
      : 'Hover over a County');
  };

  info.addTo(map);

var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [ 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000 ],
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

  legend.addTo(map);

});

  



