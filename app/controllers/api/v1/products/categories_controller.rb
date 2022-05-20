class Api::V1::Products::CategoriesController < Api::V1::Products::BaseController
  def architecture
    category_architecture = JSON.parse(File.read(Rails.root.to_s + '/config/category.json'))
    render json:category_architecture
  end

  def show
    products = Tag.find_by(name: params[:id]).products
    products = products.paginate(page: 1, per_page: 10)
    render json: product_architecture(products)
  end

  def page
    products = Tag.find_by(name: params[:category_id]).products
    products = products.paginate(page: params[:page], per_page: 10)
    render json: product_architecture(products)
  end
end
