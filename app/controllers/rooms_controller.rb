class RoomsController < ApplicationController
  before_action :find_room, only: %i[show edit update]
  rescue_from ActiveRecord::RecordNotFound, with: :no_edit_data

  def new
    @room = Room.new
  end

  def create
    # @room = Product.find(session[:product_id]).room.new(room_params)
    @room = Room.new(room_params)
    if @room.save
      Product.find(session[:product_id]).onshelf!
      redirect_to own_products_path, notice: '拍賣房間創建成功'
    else
      render :new
    end
  end

  def show
    @product = Product.find(params[:id])
    @url = request.host + "/rooms/" + params[:id]
    @bid = [@product.records.last]
  end

  def edit
  end

  def update
    if @room.update(room_params_update)
      redirect_to own_products_path, notice: '拍賣房間資訊更新成功'
    else
      render :edit
    end
  end

  private
  def room_params
    params.require(:room).permit(:start_time,:end_time,:status,:maxpeople).merge(product_id: session[:product_id],id: session[:product_id])
  end

  def room_params_update
    params.require(:room).permit(:start_time,:end_time,:status,:maxpeople)
  end

  def find_room
    @room = Room.find(params[:id])
  end

  def no_edit_data
    redirect_to new_room_path, notice: '現在來創建專屬的拍賣房間吧！'
  end
end
