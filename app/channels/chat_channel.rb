class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
    # _#{room_id}
  end

  def unsubscribed
  end
end
