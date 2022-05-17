# frozen_string_literal: true

class Product < ApplicationRecord
  searchkick  searchable: [:name],
              word_middle: [:name],
              callbacks: :async
  
  validates :name , presence: true
  validates :description, presence: true, length: { minimum: 10 }
  validates :start_price, :direct_price , presence:true,numericality: { greater_than_or_equal_to: 0,  only_integer: true }

  belongs_to :user

  def self.all_status
    [
      %w[待拍賣 for_sale],
      %w[立即競標 sales]
    ]
  end
end