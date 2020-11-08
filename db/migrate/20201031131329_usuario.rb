class Usuario < ActiveRecord::Migration[5.1]
  def change
    create_table :usuarios do |t|
      t.string :nome
      t.string :cpf
      t.date :data_nascimento
      t.string :email
    end
  end
end
