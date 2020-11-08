class Endereco < ApplicationRecord
    validates :cep, presence: true, length: {is: 8}
    belongs_to :usuario
end