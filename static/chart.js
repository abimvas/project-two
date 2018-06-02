const containerWidth = document.querySelector("#page-content-wrapper .container").clientWidth
var svgWidth = containerWidth;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.json("static/p2data.json", function (err, data) {
  if (err) throw err;

  // Step 1: Parse Data/Cast as numbers
   // ==============================
  data.forEach(function (data) {
    data.SAT = +data.SAT;
    data.Graduation = +data.Graduation;
  });


  // [83, 120]
  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([80, 100])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([750, d3.max(data, d => d.SAT)])
    .range([height, 0]);

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.Graduation))
  .attr("cy", d => yLinearScale(d.SAT))
  .attr("r", "9")
  .attr("fill", 'white')
  .attr("opacity", '.8')

  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .style('font-size',15)
    .html(d =>
      `County: ${d.County}<br>Graduation Rate: ${d.Graduation}<br>Avg.SAT_score: ${d.SAT}`
    );

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("mouseover", function (data) {
      toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

 //Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (height / 1.7))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style('font-size', 30)
    .text("Average Sat Score per County");

 chartGroup.append("text")
    .attr("transform", `translate(${width/2.5}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .style('font-size', 30)
    .text("Graduation Rate Per County");
});


$(window).on("load", function () {
  location.hash = ""
})

// drop menu
jQuery('#choice').change( function() {
   // re-render map
  var sel = $("#choice option:selected")
  var group = sel.closest("optgroup").attr("label");

   if (group === "Choropleth") {
      location.replace(`${location.origin}/#${sel.val()}`)
   } else {
      location.hash = ""
      location.pathname = sel.val()
   }
});




