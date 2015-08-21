/**
 * Client Schema
 */
Schemas.ClientSchema = new SimpleSchema({
	name: {
		type: String,
		label: 'Nombre',
		max: 100
	},
	lastName: {
		type: String,
		label: 'Apellido',
		max: 100
	},
	company: {
		type: String,
		label: 'Empresa',
		max: 50
	},
	position: {
		type: String,
		label: 'Posición',
		max: 50
	},
	phones: {
		type: [String],
		label: 'Telefonos',
		max: 30,
		maxCount: 4,
		optional: true,
	},
	emails: {
		type: [String],
		label: 'Correos',
		regEx: SimpleSchema.RegEx.Email,
		max: 50,
		maxCount: 4,
		optional: true,
	},
	addresses: {
		type: [Object],
		label: 'Direcciones',
		maxCount: 4,
		optional: true,
	},
	'addresses.$.street': {
		type: String,
		label: 'Calle',
		max: 100
	},
	'addresses.$.city': {
		type: String,
		label: 'Ciudad',
		max: 20,
		optional: true
	},
	'addresses.$.dep': {
		type: String,
		label: 'Departamento',
		max: 20,
		optional: true
	},
	createdAt: {
		type: Date,
		label: 'Creado',
		optional: true,
	},
	updatedAt: {
		type: Date,
		label: 'Modificado',
		optional: true,
	},
	createdBy: {
		type: String,
		optional: true,
	},
	updatedBy: {
		type: String,
		optional: true,
	}
});
/**
 * Clients Collection
 */
Clients = new Mongo.Collection('clients');
/**
 * Attach Schema to Collection
 */
Clients.attachSchema(Schemas.ClientSchema);
/**
 * Methods
 */
Meteor.methods({
	createVCard: function(clientId){
		if (!clientId) return;
		if (Meteor.isServer){
			var client = Clients.findOne(clientId);
			if (!client) return;
			var card          = vCard();
			card.version      = '2.1';
			card.firstName    = client.name;
			card.lastName     = client.lastName;
			card.organization = client.company;
			card.title        = client.position;
			if (client.emails && client.emails.length > 0)
				card.email = client.emails[0];
			if (client.phones && client.phones.length > 0)
				card.workPhone = client.phones[0];
			if (client.phones && client.phones.length > 1)
				card.cellPhone = client.phones[1];
			if (client.phones && client.phones.length > 2)
				card.homePhone = client.phones[2];
			var adr;
			if (client.addresses && client.addresses.length > 0){
				adr = client.addresses[0];
				card.workAddress.label         = 'Oficina';
				card.homeAddress.countryRegion = 'Uruguay';
				card.workAddress.street = adr.street;
				if (adr.city)
					card.workAddress.city = adr.city;
				if (adr.dep)
					card.workAddress.stateProvince = adr.dep;
			}
			if (client.addresses && client.addresses.length > 1){
				adr = client.addresses[1];
				card.homeAddress.label         = 'Oficina';
				card.homeAddress.countryRegion = 'Uruguay';
				card.homeAddress.street = adr.street;
				if (adr.city)
					card.homeAddress.city = adr.city;
				if (adr.dep)
					card.homeAddress.stateProvince = adr.dep;
			}
			return [card.getFormattedString(), client.name + '_' + client.lastName + '.vcf'];
		}
	}
});
