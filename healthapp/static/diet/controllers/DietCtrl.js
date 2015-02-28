/**
 * Created by Administrator on 1/12/2015.
 */
angular.module('myApp')
		.controller('DietCtrl', ['userAndDietDataService', 'userDataService', 'dietDataService', 'myConfig', '$rootScope', function (userAndDietDataService, userDataService, dietDataService, myConfig, $rootScope) {

				var self = this;
				self.dietFactors = [];
				self.userData = [];

				// Retrieve data from the DB both the diet and the user
				var getInformation = function () {
						userAndDietDataService.getData().then(function (d) {




								self.userData = d.userData;

								self.dietFactors = d.dietFactors;

								// calculate the lean body mass
								self.leanBM = d.leanBM;

								// Total macro's
								self.total = d.total;

								// Macro diet information
								self.proteinGram = d.proteinGram;
								self.proteinCalories = d.proteinCalories;

								self.fatGram = d.fatGram;
								self.fatCalories = d.fatCalories;

								self.carbCalories = d.carbCalories;
								self.carbGram = d.carbGram;

								// circle values
								self.circle = [
										{
												name: 'Protein',
												calories: self.proteinCalories

										},

										{
												name: 'Fat',
												calories: self.fatCalories

										},

										{
												name: 'Carbs ',
												calories: self.carbCalories

										}];


						});

				};

				getInformation();


				// post global user-data to the database
				var postUI = function () {
						var object;
						object = {
								id: self.userData.id,
								name: self.userData.name,
								weight: self.userData.weight,
								bodyFat: self.userData.body_fat
						};


						userDataService.editUserData(object)

								.then(getInformation()
						)
								.then(self.editTable.userInformation = false);
				};


				// post global factor-data to database
				var postDietFactors = function () {
						var object;
						object = {
								id: self.dietFactors.id,
								proteinFactor: self.dietFactors.proteinFactor,
								fatFactor: self.dietFactors.fatFactor,
								activityFactor: self.dietFactors.activityFactor,
								cutFactor: self.dietFactors.cutFactor,
								RBM: self.dietFactors.RBM

						};


						dietDataService.editDietFactors(object)
								.then(getInformation())
								.then(self.editTable.dietFactors = false);


				};

				// Edit the tables -- includes the ng-switch
				self.editTable = {
						userInformation: false,
						dietFactors: false,
						editUI: function () {
								self.editTable.userInformation = true
						},
						editDietFactors: function () {
								self.editTable.dietFactors = true
						},
						postUI: postUI,
						postDietFactors: postDietFactors


				};


		}]);