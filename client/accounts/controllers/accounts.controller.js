angular.module('conapps').controller('AccountsCtrl', 
	['$scope', '$meteor', 'TitleService', 
	function($scope, $meteor, titleService){
		titleService.reset();
	}
]);