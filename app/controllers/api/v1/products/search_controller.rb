class Api::V1::Products::SearchController <  Api::V1::Products::BaseController
    def show
        products = Product.search(params[:id],
                misspellings: {edit_distance: 5}, page:1, per_page:30)
                render json: product_architecture(products)
    end
    
    def page
        products = Product.search(params[:search_id],
        misspellings: {edit_distance: 5}, page: params[:page], per_page:30)
        render json: product_architecture(products)
    end
end