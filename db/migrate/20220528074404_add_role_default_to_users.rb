class AddRoleDefaultToUsers < ActiveRecord::Migration[6.1]
  def change
    change_column_default :users, :role, from: nil, to: "buyer"
  end
end
