/**
 * Created by Administrator on 1/19/2015.
 */
/**
 * Created by imambaksr on 1/19/2015.
 */
angular.module('myApp')
		.factory('userDataService', ['deployd', function (deployd) {

				var userData;
				var collection = 'user';

				// query global user-data from the db
				var getUserData = function () {

						userData = deployd.query(collection).then(
								function (response) {

										return response.data;


								}
						);

						return userData;

				};

				// edit global user-data from the db
				var editUserData = function (object) {

						userData = deployd.updateMultipleObjects(collection, object).then(
								function (response) {
										return response.data;
								}
						);
						return userData;
				};


				return userDataService = {
						getUserData: getUserData,
						editUserData: editUserData
				};


		}]
);