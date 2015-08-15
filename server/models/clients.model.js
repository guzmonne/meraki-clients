/**
 * Clients Publications
 */
Meteor.publish('clients-list', function(){
	return Clients.find({});
});
/**
 * Clients Hooks
 */
Clients.before.insert(function(userId, doc){
	doc.createdBy = userId;
	doc.createdAt = moment().utc().format();
	_.compactObject(doc);
	console.log(doc);
});
Clients.before.update(function(userId, doc){
	doc.updatedBy = userId;
	doc.updatedBy = moment().utc().format();
	_.compactObject(doc);
	console.log(doc);
});
/**
 * Clients Allow/Deny rules
 */
// ALLOW
Clients.allow({
	insert: function(userId, doc){
		// TODO
		// All users can insert new clients
		return true;
	},
	update: function(userId, doc, fields, modifier){
		// TODO
		// All users can updata a client
		return true;
	},
	remove: function(userId, doc){
		// TODO
		// All users can remove a client
		return true;
	},
});
// DENY
Clients.deny({
	update: function(userId, docs, fields, modifier){
		// can't change 'createdAt' field
		return _.contains(fields, 'createdAt');
	}
});
