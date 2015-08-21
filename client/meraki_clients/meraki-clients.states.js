angular.module("conapps").config(['$stateProvider',
  function($stateProvider){
    $stateProvider
      .state('meraki_clients', {
        url         : '/meraki_clients',
        templateUrl : 'client/meraki_clients/views/clients-index.ng.html',
        controller  : 'MerakiClientsCtrl',
        controllerAs: 'clients',
        abstract    : true,
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
        },
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
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
        },
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('meraki_clients.edit', {
        url: '/edit/{id}',
        views: {
          'segment': {
            templateUrl: 'client/meraki_clients/views/clients-form.ng.html'
          }
        },
        data: {
          activeTab: 'edit'
        },
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      });
    }
  ]);