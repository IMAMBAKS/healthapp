/**
 * Created by Administrator on 2/22/2015.
 */
angular.module('myApp')
		.factory('snippetService', ['deployd', function(deployd) {


				var snippets = [];
				var snippet;
				var collection = 'snippets';



				// query the snippet lists from the database
				var getSnippetList = function () {

						snippets = deployd.query(collection).then(
								function (response) {
										return response.data;
								}
						);

						return snippets;


				};

				// create a snippet
				var createSnippet = function (object) {

						snippet = deployd.createObject(collection, object).then(
								function (response) {
										return response.data;
								}
						);
						return snippet;

				};



				return snippetService = {
						getSnippetList:  getSnippetList,
						createSnippet: createSnippet
				}


		}]);