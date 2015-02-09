/**
 * Created by imambaksr on 1/23/2015.
 */
angular.module('myApp')
		.factory('foodDataService', ['deployd', function (deployd) {

				var food;
				var collection = 'food';

				// query the food from the database
				var getFood = function () {


						food = deployd.query(collection).then(
								function (response) {

										return response.data;


								});


						return food;
				};


				// post the food into the db
				var createFood = function (object) {

						food = deployd.createObject(collection, object).then(
								function (response) {
										return response;
								}
						);
						return food;
				};


				return foodDataService = {
						getFood: getFood,
						createFood: createFood

				}


		}]);
