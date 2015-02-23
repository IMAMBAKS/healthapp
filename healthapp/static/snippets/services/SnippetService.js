/**
 * Created by Administrator on 2/22/2015.
 */
angular.module('myApp')
		.factory('snippetService', ['deployd', function(deployd) {


				var snippets = [];
				var collection = 'snippets';

		//		query the snippet lists from the database
				var getSnippetList = function () {

						snippets = deployd.query(collection).then(
								function (response) {
										console.log(response.data);
										return response.data;
								}
						);

						return snippets;


				};



				return snippetService = {
						getSnippetList:  getSnippetList
				}


		}]);