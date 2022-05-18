class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms do |t|
      t.string :life_time
      t.datetime :start_time
      t.string :status
      t.integer :maxpeople
      t.belongs_to :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
