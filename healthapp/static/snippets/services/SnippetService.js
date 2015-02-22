/**
 * Created by Administrator on 2/22/2015.
 */
angular.module('myApp')
		.factory('snippetService', ['deployd', function() {


				var snippets = [];
				var collection = 'snippets';

		//		query the snippet lists from the database
				var getSnippetList = function () {

						snippets = deploys.query(collection).then(
								function (response) {
										return response.data;
								}
						);

						return snippets;


				};



				return snippetService = {
						getSnippetList:  getSnippetList
				}









		}]);