angular.module('semantic-gux').directive('sgDropdownGroup', function(){
  return {
    restrict   : 'AE',
    replace    : true,
    transclude : true,
    require    : '^sgDropdown',
    scope      : {
      title : '=title',
      value : '=value'
    },
    template: '<div class="item" ng-transclude>{{ item_title }}</div>',
    link: function(scope, element, attrs, controller) {
      // Check if title= was set... if not take the contents of the dropdown-group tag
      // title= is for dynamic variables from something like ng-repeat {{variable}}
      if (scope.title === undefined) {
        scope.item_title = attrs.title || element.children()[0].innerHTML;
      } else {
        scope.item_title = scope.title;
      }
      if (scope.value === undefined) {
        scope.item_value = attrs.value || scope.item_title;
      } else {
        scope.item_value = scope.value;
      }
      // Keep this option
      controller.add_option(scope.item_title, scope.item_value);
      //
      // Menu item click handler
      //
      element.bind('click', function() {
        controller.update_model(scope.item_title, scope.item_value);
      });
      scope.$on('$destroy', function(){
        controller.remove_option(scope.item_title, scope.item_value);
      });
    }
  };
});