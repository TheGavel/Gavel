# frozen_string_literal: true

class Room < ApplicationRecord
  belongs_to :product
  has_many :record
  has_many :messages

  # after_create { BroadcastEndtimeWorker.new.perform("I was performed!") }
  after_create { BroadcastEndtimeWorker.perform_at( self.end_time,self.id) }
end
