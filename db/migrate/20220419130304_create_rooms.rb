class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms do |t|
      t.string :countdown
      t.string :start_time
      t.string :status
      t.string :level
      t.integer :maxpeople

      t.timestamps
    end
  end
end
