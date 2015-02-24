/**
 * Created by Administrator on 1/19/2015.
 *
 * This factory service combines multiple services and makes calculations; The outpuut
 * of these calculations can be used app wide.
 *
 *
 */
angular.module('myApp')
		.factory('userAndDietDataService', ['$q', 'userDataService', 'dietDataService', 'myConfig', function ($q, userDataService, dietDataService, myConfig) {

				var self = this;

				var data;

				// combing userDataService and dietDataService
				//var serviceOutcome = $q.all([userDataService.getUserData(), dietDataService.getDietFactors()]);
				var serviceOutcome = $q.all([userDataService.getUserData()]);

				// Calculate application wide values
				var getData = function () {

						data = serviceOutcome.then(
								function (d) {



										self.userData = d[0][0];
										self.dietFactors = d[1][0];

											console.log('data = ' + d);

										//calculate the lean body mass
										self.leanBM = self.userData.weight -
										(( self.userData.body_fat / 100 ) * self.userData.weight);


										// Total macro's
										self.total = self.dietFactors.RBM * self.dietFactors.cutFactor;

										// Macro diet information
										self.proteinGram = self.dietFactors.proteinFactor * self.leanBM;
										self.proteinCalories = self.proteinGram * myConfig.proteinF;

										self.fatGram = self.dietFactors.fatFactor * self.leanBM;
										self.fatCalories = self.fatGram * myConfig.fatF;

										self.carbCalories = self.total - (self.proteinCalories + self.fatCalories);
										self.carbGram = self.carbCalories / myConfig.carbF;


										return self;


								}
						);


						return data;


				};

				return userAndDietDataService = {
						getData: getData
				};


		}]);