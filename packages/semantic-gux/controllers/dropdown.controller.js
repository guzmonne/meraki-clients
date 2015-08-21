'use strict';

angular.module('semantic-gux').controller('DropDownCtrl', ['$scope',
  function($scope) {
    $scope.options = [];

    this.add_option = function(title, value){
      $scope.options.push({'title': title, 'value': value});
      if (value == $scope.model){
        this.update_title(value)
      };
    };

    this.remove_option = function(title, value){
      for (var index in $scope.options){
        if ($scope.options[index].value == value &&
            $scope.options[index].title == title)
        {
          $scope.options.splice(index, 1);
          // Remove only one item
          break;
        }
      }
    };

    this.update_model = function (title, value) {
      if ($scope.model !== value)
        $scope.model = value;
    };

    this.update_title = function (value) {
      var changed = false;
      for (var index in $scope.options)
        if ($scope.options[index].value == value){
          $scope.title = $scope.options[index].title;
          changed      = true;
        }
      if (changed){
        $scope.text_class = 'text';
      } else{
        $scope.title      = $scope.original_title;
        $scope.text_class = 'default text';
      }
    };
  }
]);