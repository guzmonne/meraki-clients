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
	formatClient(doc);
	_.compactObject(doc);
});
Clients.before.update(function(userId, doc){
	doc.updatedBy = userId;
	doc.updatedBy = moment().utc().format();
	formatClient(doc);
	_.compactObject(doc);
});
function formatClient(doc){
	doc.name      = S(doc.name).capitalize().s;
	doc.lastName  = S(doc.lastName).capitalize().s;
	doc.company   = doc.company.toUpperCase();
	doc.position  = S(doc.position).capitalize().s;
	return doc;
}
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
