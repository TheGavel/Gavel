class BroadcastEndtimeWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(room_id)
    
    ActionCable.server.broadcast "Bid:#{room_id}",
    end: end,
    user: "user"
  end

end
