angular.module('conapps').controller("DashboardCtrl", ['$scope', '$meteor',
	function($scope, $meteor){
		var self = this;

		self.toggleSidebar = function(){
			$('.ui.sidebar').sidebar('toggle');
		}

		$scope.username = "foo";
		self.user       = {};

		$meteor.waitForUser()
			.then(function(user){
				self.user = user;
			});

		$scope.$watch('dashboard.user', function(n){
			console.log(n);
			//if (n && n.username)
				//self.username = n.username;
		});
	}
]);