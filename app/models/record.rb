# frozen_string_literal: true

class Record < ApplicationRecord
  belongs_to :user
  belongs_to :product 
  belongs_to :room
end
