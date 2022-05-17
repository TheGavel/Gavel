class ProductsController < ApplicationController
  before_action :find_own_product, only: %i[own]
  before_action :find_product, only: %i[show edit update destroy]
  before_action :pundit
  rescue_from Pundit::NotAuthorizedError, with: :no_permission


  def index
    @products = Product.all
    render layout: "product"
  end

  def show
  end

  def new
    @product = Product.new
    @tags = Tag.all
  end

  def create
    # debugger
    @product = current_user.products.new(product_params)
      if @product.save
        params[:selectChildren].each { |item|
          tag_id = Tag.find_by(name: item).id
          product_id = @product.id
          ProductsTag.create(product_id: product_id, tag_id: tag_id)
        }

        session[:product_id] = @product.id
        redirect_to new_room_path, notice: 'then create rooms!!'
      else
        render :new
      end
  end

  def edit
    session[:product_id] = @product.id
  end

  def update
    if @product.update(product_params)
      redirect_to own_products_path, notice: "Update Sussess!!"
    else
      render :edit
    end
  end

  def destroy
    @room = Room.find_by_id(params[:id])
    @room.destroy if @room
    @product.destroy
    redirect_to own_products_path, notice: "Delete Sussess!!"
  end

  def own
  end

  def search
    @products= Product.search(params[:query],
              misspellings: {edit_distance: 2})
    render json: @products.map{ |pro| {name: pro.name, desc: pro.description, status:  pro.status , direct_price: pro.direct_price } }  
  end
  private

  def product_params
    params.require(:product).permit(:name,:description,:start_price,:direct_price,:status, images: [], selectChildren: [])
  end

  def find_product
    @product = Product.find(params[:id])
  end

  def find_own_product
    @products = current_user.products
  end

  def pundit
    authorize :product
  end

  def no_permission
    flash[:alert] = '請先驗證手機號碼，才能啟用賣場功能。'
    redirect_to new_sms_auth_registration_path
  end
end