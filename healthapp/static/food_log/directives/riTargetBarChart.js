/**
 * Created by rimambaks on 2/7/2015.
 */
angular.module('myApp')
		.directive('riTargetBarChart', ['foodLogDataService', function (foodLogDataService) {
				return {

						restrict: 'EA',
						scope: {chartData: '=', chartTarget: '='},
						link: function (scope, element, attrs) {


								// Get data from http service
								foodLogDataService.getFoodLogData().then(function (data) {

										// Define the SVG size
										var margin = {top: 35, right: 30, bottom: 35, left: 70},
												w = 320 - margin.left - margin.right,
												h = 100 - margin.top - margin.bottom;


										var svg = d3.select(element[0]).append("svg")
												.attr("width", w + margin.left + margin.right)
												.attr("height", h + margin.top + margin.bottom)
												.append("g")
												.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

										// Width of a bar
										var barWidth = 30;

										//Change the bar chart when
										scope.$watch('chartData', function (data) {

												var self = this;
												self.data = data;

												// Redraw chart when e.g. changing dates
												svg.selectAll('*').remove();


												var x = d3.scale.linear()
														.domain([0, scope.chartTarget])
														.range([0, w]);

												var y = d3.scale.ordinal()
														.domain(d3.range(scope.chartTarget.length))
														.range([0, h]);

												// Scale the name y - axis names
												var y2 = d3.scale.ordinal()
														.domain(data.map(function (d) {
																return d.name
														}))
														.rangeRoundBands([0, h], 0.2);


												var yAxis = d3.svg.axis()
														.scale(y2)
														.orient("left");


												svg.append("g")
														.attr("class", "y axis")
														.call(yAxis);


												// Create barchart
												var chart = svg.selectAll('.bar')
														.data(data)
														.enter();

												chart.append('rect')
														.attr("x", function (d) {

																return x(0)
														})
														.attr("y", function (d, i) {
																return y(i);
														})
														.attr("width", function (d) {
																return x(d.value);
														})
														.attr("height", barWidth)
														.attr('fill', function (d) {
																return d.color
														});


												chart.append('rect')
														.attr("x", function (d) {

																return x(0)
														})
														.attr("y", function (d, i) {
																return y(i);
														})
														.attr("width", x(scope.chartTarget * 1.1))
														.attr("height", barWidth)
														.attr('stroke', 'black')
														.attr('fill', 'none');


												chart.append('path')
														.attr('d', d3.svg.symbol().type('triangle-down'))
														.attr('transform', 'translate(' + x(scope.chartTarget) + ', ' + (-7) + ')'
												)
														.style('fill', function (d) {
																return d.color
														})
														.style('stroke', 'black');


												chart.append('text')
														.text(scope.chartTarget)
														.attr('transform', 'translate(' + (x(scope.chartTarget) - 20) + ', ' + (-20) + ')');

												chart.append('text')
														.text(function (d) {
																return d.value;
														})
														.attr('transform', function (d, i) {
																return 'translate(' + ((x(d.value)) / 2) + ', ' + (+20) + ')'
														})


										}, true)

								})


						}


				}


		}]);