class AddBasicPriceToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :basicprice, :integer, default: 100
  end
end
