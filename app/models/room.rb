# frozen_string_literal: true

class Room < ApplicationRecord
  belongs_to :product
  validates :start_time,:end_time ,presence: true
  validates :maxpeople,presence:true ,numericality: { greater_than: 0,  only_integer: true }
  validates_datetime :start_time, after: Time.now
  validates_datetime :end_time, after: :start_time


end
