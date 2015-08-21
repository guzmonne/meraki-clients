angular.module('conapps').directive('conappsHeader', function(){
	return {
		restrict: 'E',
		controller: ['$state', '$scope', '$meteor', 'TitleService',
			function($state, $scope, $meteor, titleService){
				// Save 'this' to a new variable to ease the code
				var self = this;
				// TODO
				// Simple function to toggle the sidebar. It should be
				// running inside a directive, but I'll do it later, hence
				// the TODO.
				self.toggleSidebar = function(){
					$('.ui.sidebar').sidebar('toggle');
				}
				// Bootstrap the '_user' object to watch later. Not needed
				// but I like to initialize variables. 
				self._user        = {};
				// I do this to watch for the '_value' inside the 'TitleService'
				// service. I should try if this is really necessary.
				// TODO
				self.titleService = titleService;
				// Get the default or stored title.
				self.title        = self.titleService.get();
				// Function to logout() the client and redirect to the
				// 'login' page. I believe that since it is running inside
				// a Blaze helper, it is not generating the ui-router 
				// event so we have to do it manually.
				self.logout = function(){
					self.user = null;
					$meteor.logout();
					$state.go('login');
				};
				// Since this is running outside the ui-router scope, 
				// waiting for the resolve call is not an option. This 
				// happens because I am adding this into the index.html
				// file.
				$meteor.waitForUser()
					.then(function(user){
						self.user = user;
					});
				// Watching the '_user' object to update the 'user' object
				$scope.$watch('dashboard._user', function(n){
					if (n && n.username)
						self.user = n;
				});
				// Watching the '_value' object to update the title.
				$scope.$watch('dashboard.titleService._value', function(n){
					self.title = self.titleService.get();
				});
			}
		],
		controllerAs     : 'dashboard',
		bindToController : true,
		templateUrl      : 'client/main/views/conapps-header.ng.html',
	}
});