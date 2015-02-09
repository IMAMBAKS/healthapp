/**
 * Created by Administrator on 1/19/2015.
 */
/**
 * Created by imambaksr on 1/19/2015.
 */
angular.module('myApp')
		.factory('foodLogDataService', ['deployd', function (deployd) {

				var foodLogData;
				var collection = 'foodlog';


				// query the foodLog from the db
				var getFoodLogData = function (object) {


						foodLogData = deployd.queryByDate(collection, object).then(
								function (response) {

										return response.data;

								}
						);

						return foodLogData;

				};

				// edit a foodlog from the db
				var editFoodLogData = function (object) {

						foodLogData = deployd.updateMultipleObjects(collection, object).then(
								function (response) {
										return response.data;
								}
						);
						return foodLogData;
				};

				// post the foodlog into the db
				var removeFoodLogData = function (object) {

						foodLogData = deployd.removeObject(collection, object).then(
								function (response) {
										return response.data;
								}
						);
						return foodLogData;
				};

					// post the foodlog into the db
				var createFoodLogData = function (object) {

						foodLogData = deployd.createObject(collection, object).then(
								function (response) {
										return response.data;
								}
						);
						return foodLogData;
				};


				// initialize the foodlogdata
				var init = function () {
						foodLogData = [];
				};


				return foodLogDataService = {
						init: init,
						getFoodLogData: getFoodLogData,
						editFoodLogData: editFoodLogData,
						createFoodLogData: createFoodLogData,
						removeFoodLogData: removeFoodLogData
				};


		}]
);