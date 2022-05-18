class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :picture
      t.text :description
      t.string :status
      t.string :upload_time
      t.integer :direct_price

      t.timestamps
    end
  end
end
