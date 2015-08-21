angular.module('conapps').service("AccountsService", ['$meteor', '$q',
	function($meteor, $q){
		var Accounts = function(){
			this._user = {};
			this.waitForUser()
				.then(function(currentUser){
					this._user = {};
				})
				.catch(function(err){
					this._user = {};
					console.log(err);
				});
		};

		Accounts.prototype.waitForUser = function() {
			return $meteor.waitForUser();	
		};
		
		Accounts.prototype.userRoles = function() {
			return this.waitForUser()
				.then(function(user){
					if (!user) return;
					return user.profile.roles;
				})
				.catch(function(err){
					console.log(err);
				});
		};

		Accounts.prototype.currentUser = function(){
			return this.waitForUser()
				.then(function(currentUser){
					this._user = currentUser;
					return currentUser;
				});
		}

		Accounts.prototype.isAdmin = function() {
			return this.userRoles()
				.then(function(roles){
					if (!angular.isArray(roles)) return;
					return roles.indexOf('admin') > -1;
				})
				.catch(function(err){
					console.log(err);
				});
		};

		return new Accounts();
	}
]);