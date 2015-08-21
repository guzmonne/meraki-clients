angular.module('angular-gux').directive('guxSemanticDropdown', function(){
	return function($scope, $element, $attrs){
		$element.dropdown();
	};
});