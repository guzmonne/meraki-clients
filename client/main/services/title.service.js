angular.module('conapps').service("TitleService", [
	function(){
		var Title = function(initialValue){
			initialValue || (initialValue = '');
			this._value = initialValue
		};

		Title.prototype.get = function() {
			return this._value;
		};

		Title.prototype.set = function(value){
			if (!angular.isString(value))
				return
			this._value = value;
		}

		Title.prototype.reset = function() {
			this.set('');
		};

		return new Title("CONApps");
	}
]);