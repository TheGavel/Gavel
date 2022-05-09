class DropRoom < ActiveRecord::Migration[6.1]
  def change
    drop_table :rooms
  end
end
