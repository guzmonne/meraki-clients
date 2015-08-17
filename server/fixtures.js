if (Clients.find({}).count() === 0){
	Clients.insert({
		company : 'TATA',
		name    : 'Pedro',
		lastName: 'Picapiedra',
		phones  : [
			'099858585',
			'26963201 int 20'
		],
		emails: [
			'ppicapiedra@rockmail.com'
		],
		position: 'Encargado',
		addresses:[
			{
				street: 'Piedralisa 221',
				city: 'Bella Union',
				dep: 'Artigas'
			}
		]
	});
	Clients.insert({
		company : 'INEFOP',
		name    : 'Pablo',
		lastName: 'Marmol',
		phones  : [
			'09699885'
		],
		emails: [
			'pmarmol@rockmail.com',
			'pablo.marmol@inefop.com'
		],
		position: 'Encargado',
		addresses:[
			{
				street: 'Av. Italia 2025',
				city: 'Montevideo',
				dep: 'Montevideo'
			},
			{
				street: 'Bv. Artigas 1251',
				city: 'Montevideo',
				dep: 'Montevideo'
			}
		]
	});
}

if (Meteor.users.find().count() === 0){
	Accounts.createUser({
		username: 'admin',
		email   : 'gmonne@gmail.com',
		profile : {
			roles     : ['admin'],
			name      : 'Administrator',
			createdBy : 'Meteor.fixture.js',
			createdAt : moment().utc().format()
		}
	});
	Accounts.setPassword(Meteor.users.findOne(), 'admin');
	console.log('Default "admin" account created');
}