class AddStartPriceToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :start_price, :integer
  end
end
