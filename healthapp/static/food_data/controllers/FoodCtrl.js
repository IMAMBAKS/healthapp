/**
 * Created by rimambaks on 2/1/2015.
 */
angular.module('myApp')
		.controller('FoodCtrl', ['myConfig', 'foodDataService', function (myConfig, foodDataService) {

				var self = this;

				self.myData = [];
				self.gridOptions = [];
				self.getFood = function () {

						foodDataService.getFood().then(
								function (response) {

										self.myData = response;
										for (var i = 0; i < self.myData.length; i++) {
												self.myData[i].cal = self.myData[i].fat * myConfig.fatF +
												self.myData[i].protein * myConfig.proteinF +
												self.myData[i].carbs * myConfig.carbF;
										}


										self.gridOptions = {
												data: self.myData,
												columnDefs: [{field: 'name', displayName: 'Name'},
														{field: 'protein', displayName: 'Protein (g)'},
														{field: 'fat', displayName: 'Fat (g)'},
														{field: 'carbs', displayName: 'Carbs (g)'},
														{field: 'cal', displayName: 'Calories (kcal)'}
												]
										};




								});


				};


				self.addFood = function () {
						var object = {
								name: self.food.name,
								protein: self.food.protein,
								fat: self.food.fat,
								carbs: self.food.carbs
						};

						foodDataService.createFood(object)
								.then(self = [])
								.then(function() {
								self.getFood();
						});

				};


				self.getFood();


		}]);