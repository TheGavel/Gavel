class BroadcastEndtimeWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(room_id)
    highest_record = Record.where(room_id: room_id).last
    Boughtlist.create( user_id: highest_record.user.id ,
                       product_id: highest_record.product.id)
    Product.find(room_id).sold!
    Order.create( product_id: room_id, price: highest_record.bid, email: highest_record.user.email, description: highest_record.product.name , buyer_id: highest_record.user.id, seller_id: highest_record.product.user.id)

    ActionCable.server.broadcast "Bid:#{room_id}",
    endbid: "end",
    bidder: highest_record.user.id
  end

end
