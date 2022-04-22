class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :nickname
      t.string :password
      t.string :phone
      t.string :address
      t.boolean :is_seller
      t.integer :level

      t.timestamps
    end
  end
end
