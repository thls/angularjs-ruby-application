class Usuario < ApplicationRecord
    has_one :endereco, dependent: :destroy
    has_one :telefone, dependent: :destroy
    validates :cpf, presence: true, uniqueness: true, length: {is: 11}
    validates :email, presence: true, uniqueness: true
    validates :nome, presence:  true
    validates :data_nascimento, presence: true
    before_save { self.email = email.downcase }
end