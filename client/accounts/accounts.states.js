angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('login', {
        url         : '/login',
        templateUrl : 'client/accounts/views/login.ng.html',
        controller  : 'AccountsCtrl',
        controllerAs: 'accounts'
      });
    }
  ]);