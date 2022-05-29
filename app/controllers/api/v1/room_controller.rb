class Api::V1::RoomController < ApplicationController
  def auction
    record = Record.new(product_id: params[:productid], user_id: params[:userid], room_id: params[:roomid], bid: params[:bid])
    product = Product.find( params[:productid])

    if Record.find_by(product_id: params[:productid]) == nil 
      if (product.start_price + product.basicprice) <= params[:bid].to_i
        record.save
      else
        flash.now[:alert] = "您的出價小於最低標"
      end
    end 
    if record.bid > (product.basicprice + Product.find(params[:productid]).records.last.bid).to_i
     record.save 
     ActionCable.server.broadcast("room_channel", bid: params[:bid])
    end
    # render json: params
  end
end
