/**
 * Created by imambaksr on 1/19/2015.
 */
angular.module('myApp')
		.factory('dietDataService', ['deployd', '$rootScope', function (deployd, $rootScope) {

				var dietFactors;
				var collection = 'diet';


				// GET global diet-Factors
				var getDietFactors = function () {


						dietFactors = deployd.query(collection).then(
								function (response) {

										return response.data;

								}
						);

						return dietFactors;



				};

				// EDIT global diet-Factors
				var editDietFactors = function (object) {



						dietFactors = deployd.updateMultipleObjects(collection, object).then(
								function (response) {

										return response.data;
								}
						).then(function(){$rootScope.$broadcast('updateValues')});
						return dietFactors;


				};


				return dietDataService = {
						getDietFactors: getDietFactors,
						editDietFactors: editDietFactors
				};


		}]
);