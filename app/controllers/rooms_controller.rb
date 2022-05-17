class RoomsController < ApplicationController
  before_action :find_room, only: %i[show edit update]
  rescue_from ActiveRecord::RecordNotFound, with: :no_edit_data

  def auction
    @record = Record.new
    
  end

  def new
    @room = Room.new
  end

  def create
    # @room = Product.find(session[:product_id]).room.new(room_params)
    @room = Room.new(room_params)
    if @room.save
      redirect_to root_path, notice: 'create Sussess!!'
    else
      render :new
    end
  end

  def show
    @product = Product.find(params[:id])
    @url = root_url + "rooms/" + params[:id]
    # @url = request.host + "/rooms/" + params[:id]
  end

  def edit
  end

  def update
    if @room.update(room_params_update)
      redirect_to own_products_path, notice: "Update Sussess!!"
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
    redirect_to new_room_path, notice: 'then create rooms!!'
  end
end
