angular.module('conapps').controller("DashboardCtrl", ['$scope', '$meteor', '$rootScope', '$state', '$filter',
	function($scope, $meteor, $rootScope, $state, $filer){
		this.toggleSidebar = function(){
			$('.ui.sidebar').sidebar('toggle');
		}
	}
]);