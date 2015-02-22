/**
 * Created by imambaksr on 1/6/2015.
 */

'use strict';
angular.module('myApp', ['ui.bootstrap', 'ui.grid', 'ngRoute'])
/*		.config(['$routeProvider', function ($routeProvider) {

				$routeProvider
						.when('/food-data', {
								templateUrl: 'templates/fooddata.html'
						})
						.when('/foodlog', {
								templateUrl: 'templates/foodlog.html'
						})
						.when('/recipes', {
								templateUrl: 'templates/recipes.html'
						})
						.otherwise({
								redirectTo: '/'
						})


		}])*/

		.config(function ($httpProvider) {
				$httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs }}';
				delete $httpProvider.defaults.headers.common['X-Requested-With'];
		});
