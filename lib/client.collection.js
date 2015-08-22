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
