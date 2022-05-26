class BroadcastEndtimeWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(room_id)
    ActionCable.server.broadcast "Bid:#{room_id}",
    bid: 1000000,
    user: "user"
  end

end
