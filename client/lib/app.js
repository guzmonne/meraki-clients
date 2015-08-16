angular.module('conapps', [
  'angular-meteor',
  'ui.router',
  'semantic-gux',
  'angular-gux'
]);


function onReady() {
  angular.bootstrap(document, ['conapps']);
}

Meteor.startup(function(){
	angular.element(document).ready(onReady);
});

