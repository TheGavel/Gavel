class Tag < ApplicationRecord
  has_many :products_tags
  has_many :products, through: :products_tags
end
