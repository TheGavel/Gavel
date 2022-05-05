class RemovePictureFromProducts < ActiveRecord::Migration[6.1]
  def change
    remove_column :products, :picture
  end
end
