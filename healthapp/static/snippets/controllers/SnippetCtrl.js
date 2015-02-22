angular.module('myApp')
		.controller('SnippetCtrl', ['snippetService', function (snippetService) {

				var self = this;

				self.snippetList = [];

				self.getSnippetList = function () {


						snippetService.getSnippetList().then(
								function (response) {

										self.snippetList = response;



								}
						)


				};





		}]);