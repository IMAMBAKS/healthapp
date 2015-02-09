/**
 * Created by imambaksr on 1/14/2015.
 */
angular.module('myApp')
		.directive('riCircleChart', ['userAndDietDataService', function (userAndDietDataService) {
				return {
						restrict: 'EA',
						scope: {chartData: '='},
						link: function (scope, element, attrs) {

								//Get data from the http service
								userAndDietDataService.getData().then(function (data) {


										var margin = {top: 20, right: 20, bottom: 30, left: 70},
												w = 300 - margin.left - margin.right,
												h = 300 - margin.top - margin.bottom;


										var radius = Math.min(w, h) / 2;


										// Radius for the circle chart
										var arc = d3.svg.arc()
												.outerRadius(0.7 * radius)
												.innerRadius(0);

										// This is the radius for appending text
										var arc2 = d3.svg.arc()
												.outerRadius(radius)
												.innerRadius(0.9 * radius);


										var pie = d3.layout.pie()
												.value(function (d) {
														return d;
												})
												.sort(null);

										// Define the svg
										var svg = d3.select(element[0]).append("svg")
												.attr("width", w + margin.left + margin.right)
												.attr("height", h + margin.top + margin.bottom).append("g")
												.attr("transform", "translate(" + (w / 2 + margin.left) + "," + (h / 2 + margin.top) + ")");

										// Function for clearing everything inside the svg
										var redraw = function (data) {
												svg.selectAll('*').remove();

										};


										// Load data and manipulate data
										scope.$watch('chartData', function (data) {

												// Define the three colours for protein, fat and carbs
												var color = d3.scale.ordinal()
														.range(["#CCFF99", "#CCE5FF", "#FF9999"]);


												var total = 0;
												var names = [];
												var calories = [];

												// Create an array {name: "", calories: '"}
												for (var i = 0; i < data.length; i++) {


														calories.push(data[i].calories);
														names.push(data[i].name);

														total += data[i].calories;


												}

												// Redraw the chart every new request.
												if (calories.length > 0) {
														redraw(calories);
												}


												var g = svg.selectAll('.arc')
														.data(pie(calories))
														.enter().append('g')
														.attr('class', 'arc');

												g.append('path')
														.attr('d', arc)
														.style('fill', function (d, i) {
																return color(calories[i])
														});

												// Append values to the circle pies
												g.append('text')
														.attr('transform', function (d, i) {
																return 'translate(' + arc.centroid(d) + ')';
														})
														.style('text-anchor', 'middle')
														.text(function (d, i) {
																return parseInt((calories[i] / total) * 100) + ' %'
														});

												// Append names to the circle pies
												g.append('text')
														.attr('transform', function (d) {
																return 'translate(' + arc2.centroid(d) + ')';
														})
														.style("text-anchor", "middle")
														.text(function (d, i) {
																return names[i];
														})

										}, true);

										// Append a title to the chart
										var title = d3.select('svg').append('g')
												.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
												.attr('class', 'title');

										title.append('text')
												.attr('x', (w / 2))
												.attr('y', -3)
												.attr('text-anchor', 'middle')
												.style('font-size', '14px')
												.text('Macro nutrition ratio');

								})


						}


				}
		}]
)


;