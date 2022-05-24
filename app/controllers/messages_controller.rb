class MessagesController < ApplicationController
  def new
    @message = Message.new
  end
  
  def create
    @message = Message.new(message_params)
      ActionCable.server.broadcast "chat_channel", content: @message.content, username: @message.username
  end
  
  private
  
  def message_params
    params.require(:message).permit(:content, :username)
  end
end