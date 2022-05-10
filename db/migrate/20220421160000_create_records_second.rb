class CreateRecordsSecond < ActiveRecord::Migration[6.1]
  def change
    create_table :records do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :bid
      t.references :product, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.string :time
      t.string :seller_id

      t.timestamps
      end
  end
end
