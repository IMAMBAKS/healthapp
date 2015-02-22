/**
 * Created by imambaksr on 1/19/2015.
 */
angular.module('myApp')
		.factory('deployd', ['$http', function ($http) {

				var baseUrl = 'http://localhost:8000';

				var setBaseUrl = function (uri) {
						baseUrl = uri;
				};

				var getBaseUrl = function () {
						return baseUrl;
				};

				var query = function (collection) {
						var uri = baseUrl + '/' + collection ;
						return $http({
								method: 'GET',
								url: uri
						});
				};

				var queryByDate = function (collection, object) {
						var uri = baseUrl + '/' + collection + '/?{"date":"' + object + '"}';
						return $http({
								method: 'GET',
								url: uri,
								data: object
						});
				};

				var queryById = function (collection, id) {
						var uri = baseUrl + '/' + collection + '/' + id;
						return $http({
								method: 'GET',
								url: uri
						});
				};

				var updateMultipleObjects = function (collection, object) {
						var uri = baseUrl + '/' + collection;
						return $http({
								method: 'POST',
								url: uri,
								data: object

						});

				};

				var createObject = function(collection, object) {
						var uri = baseUrl + '/' + collection;
						return $http({
								method: 'POST',
								url: uri,
								data: object
						});
				};

				var removeObject = function(collection, id) {
						var uri = baseUrl + '/' + collection + '/' + id;
						return $http({
								method: 'DELETE',
								url: uri
						});


				};

				return deployd = {
						setBaseUrl: setBaseUrl,
						getBaseUrl: getBaseUrl,
						query: query,
						queryById: queryById,
						queryByDate: queryByDate,
						createObject: createObject,
						removeObject: removeObject,
						updateMultipleObjects: updateMultipleObjects

				};


		}]);
