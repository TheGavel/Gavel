class Api::V1::CategoriesController < Api::V1::BaseController
  def show
    products_json = Tag.find_by(name: params[:id]).products.to_json
    render json: products_json
  end
end
