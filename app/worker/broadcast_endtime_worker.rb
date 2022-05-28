class BroadcastEndtimeWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(room_id)
    highest_record = Record.where(room_id: room_id).last
    Boughtlist.create( user_id: highest_record.user.id ,
                       product_id: highest_record.product.id)
    ActionCable.server.broadcast "Bid:#{room_id}",
    endbid: "end",
    bidder: highest_record.user.id
  end

end
