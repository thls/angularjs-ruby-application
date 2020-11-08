class Telefone < ApplicationRecord
    belongs_to :usuario
    validates :numero, presence: true, length: {is: 11}
end