/**
 * Created by imambaksr on 1/23/2015.
 */
angular.module('myApp')
		.controller('FoodLogCtrl', ['foodDataService', 'foodLogDataService', 'dietDataService', 'myConfig', '$scope', function (foodDataService, foodLogDataService, dietDataService, myConfig, $scope) {

				var self = this;
				self.food = ['banana'];
				self.foodNames = [];
				// set the default quantity
				self.quantity = 1;
				self.total = "";
				self.asyncSelected = "";
				self.foodLog = [];
				var today = new Date();
				self.date = (today.getMonth() + 1).toString() + '/' + today.getDate() + '/' + today.getFullYear().toString();
				self.selectedDate = self.date;

				// update the total macro when global data has changed
				$scope.$on('updateValues', function () {
						userAndDietDataService.getData().then(function (d) {

								self.totalMacro = d.total;
								self.proteinGram = d.proteinGram;

								self.left = self.totalMacro - self.sum;

						});
				});


				// update the data when
				$scope.$on('dateChange', function (event, data) {

						self.selectedDate = data.date;
						self.getFoodLog();


				});

// get the foodLog by date via http request
				self.getFoodLog = function () {


						foodLogDataService.getFoodLogData(self.selectedDate).then(function (d) {


								self.foodLog = d;
								self.total = [];
								self.totalProtein = [];
								self.totalFat = [];
								self.totalCarbs = [];
								self.sum = 0;
								self.sumProtein = 0;
								self.sumFat = 0;
								self.sumCarbs = 0;


								for (var i = 0; i < self.foodLog.length; i++) {


										self.foodLog[i].calories = self.foodLog[i].fat * myConfig.fatF + self.foodLog[i].protein * myConfig.proteinF + self.foodLog[i].carbs * myConfig.carbF;

										self.foodLog[i].totalCalories = self.foodLog[i].quantity * self.foodLog[i].calories;


										self.total.push(self.foodLog[i].totalCalories);
										self.totalProtein.push(self.foodLog[i].quantity * self.foodLog[i].protein);
										self.totalFat.push(self.foodLog[i].quantity * self.foodLog[i].fat);
										self.totalCarbs.push(self.foodLog[i].quantity * self.foodLog[i].carbs);


										//	Calculate the quantity of carbs
										self.foodLog[i].quantityProtein = self.foodLog[i].quantity * self.foodLog[i].protein;
										self.foodLog[i].quantityFat = self.foodLog[i].quantity * self.foodLog[i].fat;
										self.foodLog[i].quantityCarbs = self.foodLog[i].quantity * self.foodLog[i].carbs;


								}

								for (var j = 0; j < self.total.length; j++) {

										self.sum += +self.total[j];
										self.sumProtein += +self.totalProtein[j];
										self.sumFat += +self.totalFat[j];
										self.sumCarbs += +self.totalCarbs[j];


								}


								userAndDietDataService.getData().then(function (d) {

										self.totalMacro = d.total;
										self.left = self.totalMacro - self.sum;
										self.proteinGram = d.proteinGram;
										self.fatGram = d.fatGram;

								});


								self.proteinBar = [{
										name: 'protein',
										value: self.sumProtein,
										color: '#CCFF99'
								}];

								self.fatBar = [{
										name: 'fat',
										value: self.sumFat,
										color: '#CCE5FF'
								}];

								self.macroBar = [{
										name: 'calories',
										value: self.sum,
										color: '#C0C0C0'
								}];


								return self.foodLog;


						})

				};

				self.getFoodLog();


// post user data to the database
				self.postFood = function () {
						var object;
						object = {
								name: self.asyncSelected.name,
								fat: self.asyncSelected.fat,
								protein: self.asyncSelected.protein,
								carbs: self.asyncSelected.carbs,
								quantity: self.asyncSelected.quantity,
								date: self.date
						};

						foodLogDataService.createFoodLogData(object)
								.then($scope.$broadcast('dateChange')
								);


						for (var i =0; i<self.asyncSelected.length; i++) {

								self.asyncSelected[i] = "";

						}


				};

				self.removeFood = function (id) {

						foodLogDataService.removeFoodLogData(id).then(function () {
								self.getFoodLog(self.selectedDate);
						})

				};


//Get all possible foods from the database
				self.getFoodData = function () {

						foodDataService.getFood().then(function (d) {

								self.food = d;


								for (var i = 0; i < d.length; i++) {
										self.foodNames.push(d[i].name);
										self.food[i].calories = self.food[i].protein * myConfig.proteinF + self.food[i].carbs * myConfig.carbF + self.food[i].fat * myConfig.fatF;
										self.food[i].quantity = 1;
										self.food[i].total = self.food[i].quantity * self.food[i].calories;


								}


						});

				};

				self.getFoodData();



		}])
;

