class RoomChannel < ApplicationCable::Channel

  def follow(data)
    stop_all_streams
    stream_from "Bid:#{data["room"]}"
    stream_from "Chat:#{data["room"]}"
  end

  def unfollow
    stop_all_streams
  end

  def bid(data)
    ActionCable.server.broadcast "Bid:#{data["room"]}",
      bid: data["price"],
      user: data["user"]
  end

  def chat(data)
    ActionCable.server.broadcast "Chat:#{data["room"]}",
      message: data["message"],
      user: data["user"]
  end
end
