class Telefone < ActiveRecord::Migration[5.1]
  def change
    create_table :telefones do |t|
      t.string :numero
      t.references :usuario, null: false
    end
  end
end
