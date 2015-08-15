angular.module('angular-gux').directive('guxEnter', function(){
	return function($scope, $element, $attrs){
		$element.bind('keydown keypress', function(event){
			if (event.which === 13){
				event.preventDefault();
				$scope.$apply(function(){ $scope.$eval($attrs.guxEnter); });
			}
		});
	};
});