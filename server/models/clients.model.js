/**
 * Clients Publications
 */
Meteor.publish('clients-list', function(options, searchString){
	var query   = {};
	var options = {};
	if (_.isObject(options)){
		options = _.pick(options, 'sort', 'limit', 'skip');
	}
	if (_.isString(searchString)){
		query = {
			$or: [
				{'name'     : { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' }},
				{'lastName' : { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' }},
				{'company'  : { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' }},
				{'position' : { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' }},
			]
		};
	}
	return Clients.find(query, options);
});
/**
 * Clients Hooks
 */
/**
 * Adds the user, created date and formats the doc
 * @param  {Mongo._id} userId               _id of the current user
 * @param  {Object} doc document storing the to-be saved client.
 * @return {Vouid}                      
 */
Clients.before.insert(function(userId, doc){
	doc.createdBy = userId;
	doc.createdAt = moment().utc().format();
	formatClient(doc);
	_.compactObject(doc);
});
/**
 * Same as the before.insert() method
 * We need to delete the _id and the create and update dates to be able
 * to use client.save() on the client, and have it play nice with the
 * Client Schema.
 * @param  {Mongo._id} userId               _id of the current user
 * @param  {Object} doc document storing the to-be saved client.
 * @return {Void}                      
 */
Clients.before.update(function(userId, doc){
	doc = _.omit(doc, '_id', 'createdAt', 'createdBy');
	doc.updatedBy = userId;
	doc.updatedBy = moment().utc().format();
	formatClient(doc);
});
/**
 * Function thay updates some fields to allow for better MongoDB
 * sorting capabilities. By default MongoDB sorts by case, which
 * creates a weird experience.
 * @param  {Object} doc Client doc to be edited.
 * @return {Object}     Returns the modified doc.
 */
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