class CreateProductsTags < ActiveRecord::Migration[6.1]
  def change
    create_table :products_tags do |t|
      t.references :product, null: false, foreign_key: true, index: true
      t.references :tag, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
