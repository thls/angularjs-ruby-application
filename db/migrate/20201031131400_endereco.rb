class Endereco < ActiveRecord::Migration[5.1]
  def change
    create_table :enderecos do |t|
      t.integer :cep
      t.string :cidade
      t.string :estado
      t.references :usuario, null: false
    end
  end
end
