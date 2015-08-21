angular.module('conapps').directive('conappsSidebar', function(){
	return {
		restrict : 'E',
		replace  : true,
		controller: ['$state', '$scope', '$meteor', 'TitleService', 'AccountsService', 
			function($state, $scope, $meteor, titleService, accounts){
				// Save 'this' to a new variable to ease the code
				var self = this;
				
				self.accounts = accounts;

				$scope.$watch('sidebar.accounts._user', function(){
					self.accounts.isAdmin()
						.then(function(isAdmin){
							self.isAdmin = isAdmin;
						})
				});
			}
		],
		controllerAs     : 'sidebar',
		bindToController : true,
		templateUrl      : 'client/main/views/conapps-sidebar.ng.html',
	}
});