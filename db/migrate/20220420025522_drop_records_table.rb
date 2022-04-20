class DropRecordsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :records
  end
end
