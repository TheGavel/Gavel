# frozen_string_literal: true

class Product < ApplicationRecord
    validates :name , presence: true
    validates :picture , presence: true
    validates :description, presence: true, length: { minimum: 10 }
    validates :upload_time , presence:true
    validates :start_price , presence:true,numericality: { greater_than_or_equal_to: 0,  only_integer: true }
    validates :direct_price , presence:true,numericality: { greater_than_or_equal_to: 0,  only_integer: true }
    
  def self.all_status
    [
      %w[待拍賣 for_sale],
      %w[立即競標 sales]
    ]
  end
end
