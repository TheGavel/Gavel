class ProductsController < ApplicationController
  before_action :find_own_product, only: %i[own sellitem buyerlist]
  before_action :find_product, only: %i[show edit update destroy]
  before_action :pundit
  skip_before_action :require_login, only: %i[index]
  rescue_from Pundit::NotAuthorizedError, with: :no_permission

  def index
    @products = Product.all
  end

  def show
  end

  def new
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
        Product.reindex
        if params[:product][:status] == "draft"
          redirect_to own_products_path, notice: '更改商品狀態為發布，大家才選的到您的商品歐~'
          return
        else
          # session[:product_id] = @product.id
          # redirect_to "/rooms/new?id=#{@product.id}", notice: '現在來創建專屬的拍賣房間吧！'
          redirect_to new_room_path(id: @product.id), notice: '現在來創建專屬的拍賣房間吧！'
          return
        end

      else
        render :new
      end
  end

  def edit
    session[:product_id] = @product.id
  end

  def update
    if @product.update(product_params)
      if @product.status != params[:product][:status]
        if params[:product][:status] == "draft"
          flash.now[:alert] = '發布商品中的，不能轉為草稿'
          render :edit
          return
        else
          redirect_to new_room_path(id: @product.id), notice: '現在來創建專屬的拍賣房間吧！'
          return
        end
      end
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

  def autocomplete
    @search_results = Product.search(params[:q],
                      misspellings: {edit_distance:5},
                      select: [:name])
    render layout: false
  end

  private
  def product_params
    params.require(:product).permit(:name, :description, :start_price, :basicprice, images: [], selectChildren: [])
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
