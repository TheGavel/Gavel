class AddEndTimeToRooms < ActiveRecord::Migration[6.1]
  def change
    add_column :rooms, :end_time, :datetime
  end
end
