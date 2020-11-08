# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

50.times do
	mail = Faker::Name.first_name + '@' + Faker::Name.middle_name;
	data = Faker::Date.between(from: '2000-09-23', to: '2014-09-25');
	user = Usuario.new(
		cpf: Faker::Number.number(digits: 11),
		nome: Faker::Name.name,
		data_nascimento: data,
		email: mail
	);
	telefone = Telefone.new(numero: Faker::Number.number(digits: 11));
	telefone.usuario = user;
	endereco = Endereco.new(
		cep: Faker::Number.number(digits: 8),
		estado: Faker::Address.state_abbr,
		cidade: Faker::Address.city
	)	
	endereco.usuario = user;
	user.save!;
end
