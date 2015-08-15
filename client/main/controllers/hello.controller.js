angular.module('conapps').controller("HelloCtrl", ['$scope', '$meteor', '$rootScope', '$state', '$filter',
	function($scope, $meteor, $rootScope, $state, $filer){
		$scope.greetings = [
			'hello!',
			'hola!'
		]
	}
]);