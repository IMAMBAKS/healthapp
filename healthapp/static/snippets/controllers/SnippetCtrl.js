angular.module('myApp')
	.controller('SnippetCtrl',['snippetService', function() {

				var self = this;

				self.snippetList = [];

				self.getSnippetList = function () {


						snippetService.getSnippetList().then(
								function(response) {

										self.snippetList = response;

								}


						)









				}








		}]);