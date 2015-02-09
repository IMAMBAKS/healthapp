/**
 * Created by Administrator on 1/29/2015.
 */
angular.module('myApp')
		.controller('CalendarCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
				var self = this;
				var today = new Date();
				self.dt = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

				$scope.$watch(function() {

								return self.dt;
						}, function (value) {

								$rootScope.$broadcast('dateChange', { date: ((value.getMonth() + 1).toString() + '/' + value.getDate() + '/' + value.getFullYear().toString())});

						}
				);


		}]);