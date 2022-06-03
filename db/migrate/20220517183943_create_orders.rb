class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :slug
      t.belongs_to :product, null: false, foreign_key: true
      t.integer :price
      t.string :status, default: "pending"
      t.string :email
      t.text :description
      t.references :buyer, null: false,foreign_key: { to_table: :users }
      t.references :seller, null: false,foreign_key: { to_table: :users }
      t.timestamps
    end

  end
end
