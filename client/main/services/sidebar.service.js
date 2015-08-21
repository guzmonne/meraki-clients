angular.module('conapps').service("SidebarService", [
	function(){
		var Sidebar = function(initialValue){
			initialValue || (initialValue = false);
			this._visible = initialValue;
		};

		Sidebar.prototype.toggle = function() {
			this._visible = !this._visible;
		};

		Sidebar.prototype.close = function() {
			this._visible = false;
		};

		Sidebar.prototype.open = function() {
			this._visible = true;
		};

		Sidebar.prototype.status = function() {
			return this._visible;
		};

		Sidebar.prototype.isVisible = function() {
			return this._visible;
		};

		return new Sidebar();
	}
]);