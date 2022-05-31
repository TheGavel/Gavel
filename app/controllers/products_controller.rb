class ProductsController < ApplicationController
  before_action :find_own_product, only: %i[own sellitem buyerlist]
  before_action :find_product, only: %i[show edit update destroy]
  before_action :pundit
  skip_before_action :require_login, only: %i[index]
  rescue_from Pundit::NotAuthorizedError, with: :no_permission

  def index
    @products = Product.all
    # render layout: "product"
  end

  def show
  end

  def new
    # BroadcastEndtimeWorker.new.perform("I was performed!")
    # BroadcastEndtimeWorker.perform_at( DateTime.now+10.second,"I was performed!")
    @product = Product.new
    @tags = Tag.all
  end

  def create
    @product = current_user.products.new(product_params)
      if @product.save
        params[:selectChildren].each { |item|
          tag_id = Tag.find_by(name: item).id
          product_id = @product.id
          ProductsTag.create(product_id: product_id, tag_id: tag_id)
        }

        session[:product_id] = @product.id
        redirect_to new_room_path, notice: '現在來創建專屬的拍賣房間吧！'
      else
        render :new
      end
  end

  def edit
    session[:product_id] = @product.id
  end

  def update
    if @product.update(product_params)
      redirect_to own_products_path, notice: '商品資訊更新成功'
    else
      render :edit
    end
  end

  def destroy
    @room = Room.find_by_id(params[:id])
    @room.destroy if @room
    @product.destroy
    redirect_to own_products_path, notice: '已成功刪除'
  end

  def own
  end

  def sellitem
    @products = current_user.boughtproducts
  end

  def buyerlist
    @products = current_user.boughtproducts
  end

  def autocomplete
    @search_results = Product.search(params[:q],
                      misspellings: {edit_distance:5},
                      select: [:name])
    # @search_results =Product.all.map(&:name)
    render layout: false
  end

  def buy
    product = Product.find(params[:id])
    product_price = Product.find(params[:id]).start_price
    product_name = Product.find(params[:id]).name
    order = current_user.orders.create(description: product_name, price: product_price, product: product, email: current_user.email)
    redirect_to check_order_path(order.id)

  private
  def product_params
    params.require(:product).permit(:name, :description, :start_price, :direct_price, :status, images: [], selectChildren: [])
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
    redirect_to new_sms_auth_registration_path
  end
end
