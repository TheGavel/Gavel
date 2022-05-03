class ProductsController < ApplicationController
    before_action :find_product, only: %i[show edit update destroy]

    def index
        @products = Product.all
    end

    def show    
    end
    
    def new
        @product = Product.new
    end
    
    def create
        @product = Product.new(product_params)
        if @product.save
            redirect_to products_path, notice: 'Create Sussess!!'
          else
            render :new
          end
    end

    def edit 
    end
    
    def update
        if @product.update(product_params)
            redirect_to products_path, notice: "Update Sussess!!"
        else
            render :edit
        end
    end

    def destroy
        @product.destroy
        redirect_to products_path, notice: "Delete Sussess!!"
        
    end
    
    private

    def product_params
        params.require(:product).permit(:name,:description,:start_price,:direct_price,:upload_time,:status,:picture)
        
    end
    
    def find_product
        @product = Product.find_by(id: params[:id])
    end
end
