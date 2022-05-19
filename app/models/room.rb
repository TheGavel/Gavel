# frozen_string_literal: true

class Room < ApplicationRecord
  belongs_to :product
  has_many :record
end
