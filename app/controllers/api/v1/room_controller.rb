class Api::V1::RoomController < Api::V1::BaseController
  def auction
    record = Record.new(product_id: params[:productid], user_id: params[:userid], room_id: params[:roomid], bid: params[:bid])
    record.save
    render json: params
  end
end
