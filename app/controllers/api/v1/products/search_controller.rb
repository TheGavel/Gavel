class Api::V1::Products::SearchController < ApplicationController
    def show
        product = Product.search(params[:id],
                misspellings: {edit_distance: 2}, page:1, per_page:30)
        render json: product.map{ |pro| {image: url_for(pro.images[0]),
                                        name: pro.name,
                                        description: pro.description,
                                        status: pro.status,
                                        direct_price: pro.direct_price,
                                        start_price: pro.start_price}}
    end
    
    def page
        product = Product.search(params[:search_id],
        misspellings: {edit_distance: 2}, page: params[:page], per_page:30)
        render json: product.map{ |pro| {image: url_for(pro.images[0]),
                                        name: pro.name,
                                        description: pro.description,
                                        status: pro.status,
                                        direct_price: pro.direct_price,
                                        start_price: pro.start_price}}
    end
end