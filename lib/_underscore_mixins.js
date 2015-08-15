_.mixin({
	compactObject: function(obj){
		_.each(obj, function(val, key){
			if (!val || ( _.isArray(val) && val.length === 0)){
				delete obj[key];
			}
		});
		return obj;
	},
	compactCloneObject: function(obj){
		return _.compactObject(_.clone(obj));
	}
})