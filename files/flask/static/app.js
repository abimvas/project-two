// variables
key = 'pk.eyJ1IjoiaGFnaW44MSIsImEiOiJjamhkYnI3OXMwOXhvM2NtbGRreWdpYnNlIn0.xa19EIY7LAkFsF8cmWm3lA';
var gradData = [ ];
var county, rate, income;

// get data from API
d3.json("/data", function(response) {  

// looping to get county rates and income from response json
 for ( var i in response ) {

      data = response[i]; 
      for ( var a in data ) {
           
        county = data[a]['County'];
        rate = data[a]['Graduation Rate'];
        income = data[a]['Income'];
        console.log( income );
      }
    }
});

// initialize map
var map = L.map('map').setView([ 31.968599, -99.901813], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + key, {
    id: 'mapbox.light',
    attribution: '',
}).addTo(map);

L.geoJson(txdata).addTo(map);






