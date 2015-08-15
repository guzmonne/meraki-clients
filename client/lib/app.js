angular.module('conapps', [
  'angular-meteor',
  'ui.router',
  'semantic-gux',
  'angular-gux'
]);


function onReady() {
  angular.bootstrap(document, ['conapps']);
}

angular.element(document).ready(onReady);

