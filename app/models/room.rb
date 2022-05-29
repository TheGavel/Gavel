# frozen_string_literal: true

class Room < ApplicationRecord
  after_create { BroadcastEndtimeWorker.perform_at( self.end_time,self.id) }

  belongs_to :product
  has_many :record

  validates :start_time,:end_time ,presence: true
  validates :maxpeople,presence:true ,numericality: {  greater_than_or_equal_to: 5,  only_integer: true }
  validates_datetime :start_time, after: Time.now
  validates_datetime :end_time, after: :start_time , after: Time.now


end
