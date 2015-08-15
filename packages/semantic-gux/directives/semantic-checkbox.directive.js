angular.module('semantic-gux').directive('sgCheckbox', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			checked  : '&?',
			disabled : '&?',
			ngModel  : '=ngModel',
			sgClass  : '@'
		},
		controller: function(){
			var self = this;
			self.sgClass = (self.sgClass) ? self.sgClass : '';
			if (angular.isFunction(self.checked)) {
				self.checked = !!self.checked();
			}
			this.toggle = function(){
				if (angular.isFunction(self.disabled) && self.disabled()) return;
				self.ngModel = !self.ngModel;
			}
			if (!self.behavior){
				behavior = (self.checked) ? 'check' : 'uncheck';
			}
		},
		controllerAs: 'sg',
		bindToController: true,
		require: 'ngModel',
		template: [
			'<div class="ui checkbox {{sg.sgClass}}">',
	      '<input type="checkbox" ng-model="sg.ngModel" ng-disabled="sg.disabled()" tabindex="0" class="hidden">',
	      '<label ng-click="sg.toggle()" ng-transclude></label>',
	    '</div>',
		].join(''),
	}
});