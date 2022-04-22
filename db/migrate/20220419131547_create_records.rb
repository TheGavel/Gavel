class CreateRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :records do |t|
      t.references :buyer
      t.integer :bid
      t.references :product
      t.references :room
      t.string :time
      t.string :seller_id

      t.timestamps
    end
  end
end
