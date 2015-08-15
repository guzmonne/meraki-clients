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

/*
		self.list = [
			{
				_id     : 1,
				company : 'TATA',
				name    : 'Pedro Picapiedra',
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
			},
			{
				_id     : 2,
				company : 'INEFOP',
				name    : 'Pablo Marmol',
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
			}
		];
		*/