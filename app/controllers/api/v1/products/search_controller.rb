class Api::V1::Products::SearchController < ApplicationController
    def show
        # 找出搜尋的內容
        product= Product.search(params[:id],
        misspellings: {edit_distance: 2}, page:1, per_page:30)

        # 返回hash
        pro = product.as_json

        # 接收一個及多個的引數，第一個引數是函數名，是需要通過url_for()函數來獲取路由的函數名，當函數中有引數時，則需要將這些引數依次傳入到url_for()函數第一個引數的後面
        pro.each_with_index do |product,index|
        product[:image] =url_for(pp[index].images[0])
        end

        render json: pro

    end
    
    
    def page
   
    end

 
end
