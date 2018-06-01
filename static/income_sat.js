// You can reproduce this figure in plotly.js with the following code!

// Learn more about plotly.js here: https://plot.ly/javascript/getting-started

/* Here's an example minimal HTML template
 *
 * <!DOCTYPE html>
 *   <head>
 *     <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
 *   </head>
 *   <body>
 *   <!-- Plotly chart will be drawn inside this div -->
 *   <div id="plotly-div"></div>
 *     <script>
 *     // JAVASCRIPT CODE GOES HERE
 *     </script>
 *   </body>
 * </html>
 */

trace1 = {
  x: ['$43,967 ', '$60,644 ', '$43,658 ', '$44,866 ', '$58,928 ', '$54,868 ', '$53,622 ', '$55,973 ', '$40,536 ', '$55,885 ', '$56,449 ', '$36,616 ', '$40,753 ', '$51,993 ', '$53,170 ', '$57,634 ', '$47,636 ', '$45,455 ', '$74,510 ', '$42,279 ', '$43,055 ', '$43,376 ', '$27,703 ', '$43,770 ', '$48,533 ', '$55,919 ', '$49,598 ', '$52,916 ', '$45,727 ', '$36,587 ', '$41,937 ', '$62,573 ', '$40,597 ', '$45,229 ', '$80,279 ', '$39,407 ', '$39,140 ', '$49,171 ', '$39,900 ', '$41,529 ', '$42,258 ', '$90,382 ', '$37,389 ', '$48,161 ', '$76,296 ', '$40,052 ', '$39,622 ', '$59,243 ', '$50,122 ', '$57,408 ', '$46,556 ', '$35,136 ', '$48,470 ', '$54,429 ', '$41,073 ', '$43,944 ', '$41,266 ', '$80,841 ', '$38,239 ', '$38,275 ', '$34,777 ', '$37,789 ', '$53,474 ', '$42,048 ', '$69,448 ', '$43,787 ', '$38,559 ', '$46,347 ', '$53,776 ', '$46,247 ', '$40,536 ', '$36,056 ', '$90,972 ', '$44,202 ', '$45,681 ', '$39,193 ', '$51,910 ', '$64,155 ', '$58,787 ', '$71,360 ', '$55,264 ', '$45,491 ', '$47,828 ', '$51,808 ', '$45,594 ', '$50,891 ', '$67,683 ', '$40,152 ', '$45,718 ', '$57,832 ', '$35,521 ', '$60,692 ', '$56,415 ', '$47,181 ', '$70,121 ', '$34,653 ', '$64,864 ', '$74,856 ', '$43,425 ', '$35,928 ', '$47,338 ', '$46,856 ', '$57,346 ', '$46,582 ', '$34,587 ', '$51,863 ', '$35,252 ', '$51,827 ', '$53,936 ', '$67,249 ', '$46,975 ', '$53,143 ', '$44,909 ', '$46,688 ', '$46,198 ', '$40,056 ', '$59,809 ', '$40,931 ', '$47,608 ', '$62,363 ', '$83,805 ', '$50,461 ', '$40,118 ', '$40,612 ', '$44,106 ', '$37,586 ', '$39,926 ', '$41,887 ', '$37,846 ', '$52,637 ', '$48,975 ', '$51,768 ', '$44,891 ', '$48,592 ', '$39,382 ', '$51,953 ', '$48,135 ', '$48,587 ', '$39,869 ', '$42,429 ', '$34,919 ', '$58,760 ', '$44,818 ', '$46,324 ', '$35,654 ', '$40,125 ', '$46,662 ', '$67,249 ', '$51,304 ', '$68,729 ', '$42,302 ', '$43,540 ', '$41,262 ', '$46,237 ', '$72,506 ', '$52,344 ', '$38,255 ', '$37,464 ', '$38,099 ', '$44,111 ', '$41,388 ', '$40,969 ', '$53,562 ', '$61,194 ', '$54,212 ', '$53,611 ', '$43,589 ', '$47,780 ', '$67,735 ', '$48,344 ', '$45,414 ', '$43,014 ', '$41,563 ', '$32,742 ', '$47,354 ', '$65,795 ', '$67,308 ', '$36,744 ', '$36,352 ', '$40,092 ', '$45,366 ', '$42,680 ', '$97,484 ', '$40,112 ', '$46,421 ', '$38,451 ', '$36,426 ', '$45,794 ', '$51,667 ', '$39,995 ', '$47,258 ', '$50,316 ', '$55,403 ', '$37,410 ', '$52,520 ', '$56,944 ', '$26,691 ', '$42,831 ', '$54,760 ', '$38,790 ', '$61,553 ', '$48,215 ', '$41,114 ', '$38,910 ', '$42,876 ', '$45,324 ', '$48,221 ', '$70,068 ', '$38,973 ', '$43,617 ', '$49,015 ', '$56,335 ', '$36,913 ', '$42,104 ', '$49,751 ', '$53,659 ', '$42,709 ', '$56,407 ', '$63,809 ', '$53,157 ', '$36,718 ', '$46,097 ', '$47,476 ', '$45,071 ', '$40,955 ', '$31,225 ', '$82,370 ', '$66,045 ', '$57,609 ', '$47,260 ', '$57,114 ', '$52,133 ', '$34,136 ', '$25,507 '], 
  y: ['955.8571428571429', '977.0', '956.1428571428571', '946.0', '1017.0', '945.0', '896.0', '966.0', '980.0', '1035.0', '929.0', '', '936.3333333333334', '971.9090909090909', '889.0', '961.5', '932.5', '1129.1666666666667', '968.5714285714286', '1009.0', '972.5', '983.0', '', '990.1666666666666', '963.0', '954.0', '891.3333333333334', '995.0', '945.0', '903.6', '911.0', '', '1065.6666666666667', '1183.0', '947.3333333333334', '978.6', '', '971.0', '960.0', '', '945.0', '1045.0', '915.0', '951.0', '937.3333333333334', '930.3333333333334', '1075.0', '998.3333333333334', '992.75', '920.0', '865.0', '918.0', '1013.0', '895.5806451612904', '836.0', '1095.0', '919.0', '1039.8461538461538', '', '825.0', '862.0', '957.0', '909.0', '850.8461538461538', '963.1', '930.8333333333334', '876.3333333333334', '999.2857142857143', '1009.0', '', '845.0', '', '969.25', '1115.0', '959.0', '884.5', '908.0', '906.6', '976.0', '', '935.0', '879.0', '941.0', '1016.3636363636364', '982.625', '964.5', '964.75', '1043.5', '986.0', '1142.5', '927.0', '948.6', '896.3714285714286', '952.0', '', '', '1019.8', '1017.0', '960.6666666666666', '908.7647058823529', '952.875', '1009.6', '1021.6666666666666', '943.75', '884.8', '1026.0', '854.5', '962.7', '934.5', '1128.0', '950.6666666666666', '985.0', '992.4', '892.0', '911.8888888888889', '966.6666666666666', '960.2222222222222', '980.25', '911.3333333333334', '941.5714285714286', '1010.5', '933.0', '859.0', '934.0', '900.3333333333334', '', '836.0', '978.5', '884.0', '911.5', '999.0', '985.3333333333334', '873.4', '896.1666666666666', '848.0', '975.5', '1011.0', '959.1', '901.6666666666666', '907.0', '', '1072.5', '949.0', '955.25', '872.0', '882.0', '973.0526315789474', '1016.0', '976.8', '976.0', '970.2', '1015.5', '1040.0', '995.6', '990.3333333333334', '984.5', '910.0', '967.0', '989.7142857142857', '908.5714285714286', '945.5', '1042.6666666666667', '956.8', '865.0', '949.0', '934.8', '927.0', '975.75', '992.7142857142857', '1080.0', '929.3333333333334', '849.1666666666666', '972.0', '793.0', '1029.0', '1035.0', '1045.0', '1160.0', '964.0', '887.0', '1001.0', '925.75', '1000.5', '1014.6666666666666', '922.4', '917.5', '895.5', '906.5', '922.8571428571429', '984.3333333333334', '915.0', '792.0', '987.5', '847.5', '953.375', '921.5', '942.5', '946.0', '920.0', '1113.0', '983.7391304347826', '1017.8', '', '903.6666666666666', '923.0', '937.5', '1009.7142857142857', '1028.8333333333333', '918.5', '958.0', '964.8333333333334', '1055.0', '936.25', '1002.5', '985.5714285714286', '903.5', '932.3333333333334', '838.6666666666666', '965.0', '987.0', '868.0', '963.4', '', '929.1666666666666', '1039.0', '863.75', '1003.3', '947.25', '959.2857142857143', '955.6666666666666', '1029.0', '1003.0', '917.0', '798.0'], 
  hoverinfo: 'x+y', 
  marker: {
    color: 'rgb(227, 119, 194)', 
    opacity: 1, 
    size: 7
  }, 
  mode: 'markers', 
  name: 'Total SAT Score', 
  text: ['Anderson', 'Andrews', 'Angelina', 'Aransas', 'Archer', 'Armstrong', 'Atascosa', 'Austin', 'Bailey', 'Bandera', 'Bastrop', 'Baylor', 'Bee', 'Bell', 'Bexar', 'Blanco', 'Bosque', 'Bowie', 'Brazoria', 'Brazos', 'Brewster', 'Briscoe', 'Brooks', 'Brown', 'Burleson', 'Burnet', 'Caldwell', 'Calhoun', 'Callahan', 'Cameron', 'Camp', 'Carson', 'Cass', 'Castro', 'Chambers', 'Cherokee', 'Childress', 'Clay', 'Cochran', 'Coke', 'Coleman', 'Collin', 'Collingsworth', 'Colorado', 'Comal', 'Comanche', 'Concho', 'Cooke', 'Coryell', 'Crane', 'Crockett', 'Crosby', 'Dallam', 'Dallas', 'Dawson', 'Deaf Smith', 'Delta', 'Denton', 'Dickens', 'Dimmit', 'Duval', 'Eastland', 'Ector', 'El Paso', 'Ellis', 'Erath', 'Falls', 'Fannin', 'Fayette', 'Fisher', 'Floyd', 'Foard', 'Fort Bend', 'Franklin', 'Freestone', 'Frio', 'Gaines', 'Galveston', 'Gillespie', 'Glasscock', 'Goliad', 'Gonzales', 'Gray', 'Grayson', 'Gregg', 'Grimes', 'Guadalupe', 'Hale', 'Hamilton', 'Hansford', 'Hardeman', 'Hardin', 'Harris', 'Harrison', 'Hartley', 'Haskell', 'Hays', 'Hemphill', 'Henderson', 'Hidalgo', 'Hill', 'Hockley', 'Hood', 'Hopkins', 'Houston', 'Howard', 'Hudspeth', 'Hunt', 'Hutchinson', 'Irion', 'Jack', 'Jackson', 'Jasper', 'Jeff Davis', 'Jefferson', 'Jim Wells', 'Johnson', 'Jones', 'Karnes', 'Kaufman', 'Kendall', 'Kerr', 'Kimble', 'Kinney', 'Kleberg', 'Knox', 'La Salle', 'Lamar', 'Lamb', 'Lampasas', 'Lavaca', 'Lee', 'Leon', 'Liberty', 'Limestone', 'Live Oak', 'Llano', 'Lubbock', 'Lynn', 'Madison', 'Marion', 'Martin', 'Mason', 'Matagorda', 'Maverick', 'McCulloch', 'McLennan', 'McMullen', 'Medina', 'Midland', 'Milam', 'Mills', 'Mitchell', 'Montague', 'Montgomery', 'Moore', 'Morris', 'Motley', 'Nacogdoches', 'Navarro', 'Newton', 'Nolan', 'Nueces', 'Ochiltree', 'Oldham', 'Orange', 'Palo Pinto', 'Panola', 'Parker', 'Parmer', 'Pecos', 'Polk', 'Potter', 'Presidio', 'Rains', 'Randall', 'Reagan', 'Real', 'Red River', 'Reeves', 'Refugio', 'Robertson', 'Rockwall', 'Runnels', 'Rusk', 'Sabine', 'San Augustine', 'San Jacinto', 'San Patricio', 'San Saba', 'Schleicher', 'Scurry', 'Shackelford', 'Shelby', 'Smith', 'Somervell', 'Starr', 'Stephens', 'Sutton', 'Swisher', 'Tarrant', 'Taylor', 'Terrell', 'Terry', 'Throckmorton', 'Titus', 'Tom Green', 'Travis', 'Trinity', 'Tyler', 'Upshur', 'Upton', 'Uvalde', 'Val Verde', 'Van Zandt', 'Victoria', 'Walker', 'Waller', 'Ward', 'Washington', 'Webb', 'Wharton', 'Wheeler', 'Wichita', 'Wilbarger', 'Willacy', 'Williamson', 'Wilson', 'Wise', 'Wood', 'Yoakum', 'Young', 'Zapata', 'Zavala'], 
  textsrc: 'abi.mvasquez:292:a65e69', 
  type: 'scatter', 
  uid: 'c2e728', 
  xsrc: 'abi.mvasquez:292:9b6261', 
  ysrc: 'abi.mvasquez:292:a6231f'
};
data = [trace1];
layout = {
  autosize: true, 
  hovermode: 'closest', 
  showlegend: true, 
  title: 'Income vs. SAT Score', 
  xaxis: {
    autorange: true, 
    range: [20854.0977377, 102136.902262], 
    showspikes: true, 
    title: 'Income',
    type: 'linear'
  }, 
  yaxis: {
    autorange: true, 
    range: [762.796201535, 1212.20379846], 
    showspikes: true, 
    title: 'SAT Score', 
    type: 'linear'
  }
};
Plotly.plot('scatter-div', {
  data: data,
  layout: layout
});