angular.module('semantic-gux').directive('sgDropdown', function(){
  return {
		restrict   : 'E',
		replace    : true,
		transclude : true,
		controller : 'DropDownCtrl',
    scope: {
			title : '@',
			open  : '@',
			model : '=ngModel'
    },
    template: [
    	'<div class="{{ dropdown_class }}">',
    		'<div class="{{text_class}}">{{ title }}</div>',
    		'<i class="dropdown icon"></i>',
    		'<div class="{{ menu_class }}"  ng-transclude></div>',
    	'</div>'
    ].join(''), 
    link: function(scope, element, attrs, controller) {
			scope.dropdown_class = 'ui selection dropdown';
			scope.menu_class     = 'menu transition hidden';
			scope.text_class     = 'default text';
			scope.original_title = scope.title;
      if (scope.open === 'true') {
				scope.is_open        = true;
				scope.dropdown_class = scope.dropdown_class + ' active visible';
				scope.menu_class     = scope.menu_class + ' visible';
      } else {
        scope.is_open = false;
      }
      /*
       * Watch for ng-model changing
       */
      scope.element = element;
      scope.$watch('model', function (value) {
        // update title or reset the original title if its empty
        controller.update_title(value);
      });
      /*
       * Click handler
       */
      element.bind('click', function() {
        if (scope.is_open === false) {
          scope.$apply(function() {
						scope.dropdown_class = 'ui selection dropdown active visible';
						scope.menu_class     = 'menu transition visible';
          });
        } else {
          scope.$apply(function() {
						scope.dropdown_class = 'ui selection dropdown';
						scope.menu_class     = 'menu transition hidden';
          });
        }
        scope.is_open = !scope.is_open;
      });
    }
  };
});