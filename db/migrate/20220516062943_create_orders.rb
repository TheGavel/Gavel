class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :slug
      t.belongs_to :product, null: false, foreign_key: true
      t.integer :price
      t.string :status
      t.string :email
      t.belongs_to :user, null: false, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end
