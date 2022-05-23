class Api::V1::RoomController < Api::V1::BaseController
  def auction
    record = Record.new(product_id: params[:productid], user_id: params[:userid], room_id: params[:roomid], bid: params[:bid])
    product = Product.new(basicprice: params[:basicprice])
    if record.bid > product.basicprice
     record.save
     ActionCable.server.broadcast("room_channel", bid: params[:bid])
    end
    render json: params
  end
end
