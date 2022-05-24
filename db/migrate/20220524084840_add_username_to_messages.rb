class AddUsernameToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :username, :string
  end
end
