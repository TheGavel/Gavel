class SorceryCore < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email,null: false, index: { unique: true }
      t.string :crypted_password
      t.string :salt

      t.string :username
      t.string :nickname
      t.string :phone
      t.string :address
      t.boolean :is_seller
      t.integer :level

      t.timestamps   null: false
    end
  end
end
