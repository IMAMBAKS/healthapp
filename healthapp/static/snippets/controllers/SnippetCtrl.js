angular.module('myApp')
		.controller('SnippetCtrl', ['snippetService', function (snippetService) {

				var self = this;

				self.snippetList = [];
				self.snippetTitle = "";

				self.getSnippetList = function () {


						snippetService.getSnippetList().then(
								function (response) {

										self.snippetList = response;


								}
						)


				};

				self.getSnippetList();

				self.createSnippet = function () {
						var object;
						console.log(self.snippetTitle);
						object = {
								title: self.snippetTitle
						};

						snippetService.createSnippet(object).then(function () {

								self.getSnippetList();
						});


				}


		}]);