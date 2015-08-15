angular.module("conapps").run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);

angular.module("conapps").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('meraki_clients', {
        url         : '/meraki_clients',
        controller  : 'MerakiClientsCtrl',
        templateUrl : 'client/meraki_clients/views/clients-index.ng.html',
        controllerAs: 'clients',
        abstract    : true
      })
      .state('meraki_clients.index', {
        url: '',
        views: {
          'segment': {
            templateUrl: 'client/meraki_clients/views/clients-table.ng.html'
          }
        },
        data: {
          activeTab: 'list'
        }
      })
      .state('meraki_clients.new', {
        url: '/new',
        views: {
          'segment': {
            templateUrl: 'client/meraki_clients/views/clients-form.ng.html'
          }
        },
        data: {
          activeTab: 'new'
        }
      });

    $urlRouterProvider.otherwise("/meraki_clients");
  }]);