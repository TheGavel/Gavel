class MoneyController < ApplicationController
  def index
    ActionCable.server.broadcast("room_channel", {message: "hello"})    
  end
end