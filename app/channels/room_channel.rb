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

    record = Record.new(product_id: data["room"],
                        user_id: data["user"],
                        room_id:  data["room"],
                        bid: data["price"])

    product = Product.find( data["room"] )
    begin
    record.with_lock do

      if Record.find_by(product_id: data["room"]) == nil #product.records == []
        if (product.start_price + product.basicprice) <= data["price"].to_i
          record.save
          ActionCable.server.broadcast "Bid:#{data["room"]}",
          bid: data["price"],
          user: data["user"],
          username: User.find(data["user"]).username
          return
        else
          # flash.now[:alert] = "您的出價小於最低標"
          ActionCable.server.broadcast "Bid:#{data["room"]}",
          bid: 0,
          user: data["user"],
          username: User.find(data["user"]).username
          return
        end
      end


      if record.bid >= (product.basicprice + product.records.last.bid).to_i
        record.save!
        ActionCable.server.broadcast "Bid:#{data["room"]}",
        bid: data["price"],
        user: data["user"],
        username: User.find(data["user"]).username
      end

    end
    rescue => error
      ActionCable.server.broadcast "Bid:#{data["room"]}",
      race_condition: "race_condition",
      user: data["user"]
    end
  end

  def chat(data)
    ActionCable.server.broadcast "Chat:#{data["room"]}",
      message: data["message"],
      user: data["user"]
  end
end
